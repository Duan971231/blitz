import { Units } from '@turf/turf';
import * as turf from '@turf/turf';
import { Map, MapMouseEvent, Marker, MarkerOptions } from 'maplibre-gl';
import maplibregl from 'maplibre-gl';

import { createEmpty, createPointItem, initGeoJson, myFeature } from './geojson-init';

/**
 * 先设置全局 my-measure-line-div 样式，Marker 才会显示正确的样式
 */

export class MeasureLine {
  private map: Map;

  private measureBo = false; // 判断测距功能是否打开了，默认 false: 未打开

  private measureComplete = true; // 判断当前图形是否绘制结束

  private pointsGeojson = initGeoJson(); // 点

  private lineString = createEmpty('LineString'); // 测距中的实线

  private linesGeojson = initGeoJson(); // 线

  private lineMoveGeojson = initGeoJson(); // 移动的线

  private lineMoveString = createEmpty('LineString'); // 测距中的虚线

  private timeout: any = undefined; // 用来判断是单机还是双击

  private markers: Marker[] = [];

  constructor(map: Map) {
    this.map = map;
  }

  start() {
    if (this.measureBo == false) {
      this.measureBo = true;
      this.deleteEvent();
      // this.clearAll();
      // 禁止双击缩放
      this.map.doubleClickZoom.disable();

      // 绑定事件
      this.map.on('click', this.clickFn);
      this.map.on('mousemove', this.lineMoveFn);
      this.map.on('dblclick', this.dblclickFn);
      this.measureComplete = true;

      // 添加资源
      if (!this.map.getSource('measure-line-points-source')) {
        this.map.addSource('measure-line-points-source', {
          type: 'geojson',
          data: this.pointsGeojson,
        });
      }
      if (!this.map.getSource('measure-line-lines-source')) {
        this.map.addSource('measure-line-lines-source', {
          type: 'geojson',
          data: this.linesGeojson,
        });
      }
      if (!this.map.getSource('measure-line-line-move-source')) {
        this.map.addSource('measure-line-line-move-source', {
          type: 'geojson',
          data: this.lineMoveGeojson,
        });
      }
      // 添加图层
      if (!this.map.getLayer('measure-line-points-layer')) {
        this.map.addLayer({
          id: 'measure-line-points-layer',
          type: 'circle',
          source: 'measure-line-points-source',
          paint: {
            'circle-radius': 5,
            'circle-color': '#F00',
            'circle-opacity': 0.85,
          },
          filter: ['in', '$type', 'Point'],
        });
      }
      if (!this.map.getLayer('measure-line-lines-layer')) {
        this.map.addLayer({
          id: 'measure-line-lines-layer',
          type: 'line',
          source: 'measure-line-lines-source',
          paint: {
            'line-color': '#F00',
            'line-width': 2,
            'line-opacity': 0.75,
          },
          filter: ['in', '$type', 'LineString'],
        });
      }
      if (!this.map.getLayer('measure-line-line-move-layer')) {
        this.map.addLayer({
          id: 'measure-line-line-move-layer',
          type: 'line',
          source: 'measure-line-line-move-source',
          paint: {
            'line-dasharray': [2, 4],
            'line-color': '#F00',
            'line-width': 2,
            'line-opacity': 0.75,
          },
        });
      }
    }
  }

  /**
   * 取消绘制功能
   */
  cancel = () => {
    this.measureBo = false;
    this.deleteEvent();
    this.clearAll();
    this.map.getCanvas().style.cursor = '';
    this.map.doubleClickZoom.enable();
    this.measureComplete = true;
    this.clearSource();
  };

  /**
   * 清除所有资源
   */
  clearSource() {
    // layer
    if (this.map.getLayer('measure-line-points-layer')) {
      this.map.removeLayer('measure-line-points-layer');
    }
    if (this.map.getLayer('measure-line-lines-layer')) {
      this.map.removeLayer('measure-line-lines-layer');
    }
    if (this.map.getLayer('measure-line-line-move-layer')) {
      this.map.removeLayer('measure-line-line-move-layer');
    }
    // source
    if (this.map.getSource('measure-line-points-source')) {
      this.map.removeSource('measure-line-points-source');
    }
    if (this.map.getSource('measure-line-lines-source')) {
      this.map.removeSource('measure-line-lines-source');
    }
    if (this.map.getSource('measure-line-line-move-source')) {
      this.map.removeSource('measure-line-line-move-source');
    }
  }

  /**
   * 清除所有数据
   */
  clearAll() {
    // 清除现有的 layer
    this.lineString = createEmpty('LineString');

    this.setPointLayer([]);
    this.setLineLayer([]);
    this.setLineMovelayer([]);

    // 清除所有 Marker
    for (const e of this.markers) {
      e.remove();
    }
  }

  // 鼠标点击事件
  private clickFn = (e: MapMouseEvent) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      // 取出最后一条线段的 features
      // if (pointsGeojson.features.length > 1) pointsGeojson.features.pop();
      // 获取当前点是否已经绘制了
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['measure-line-points-layer'],
      });
      if (features.length > 0) {
        // 如果当前点已经存在的话，将当前点从points中去除
        const id = features[0].properties.id;
        this.pointsGeojson.features = this.pointsGeojson.features.filter((point: any) => {
          return point.properties.id != id;
        });
      } else {
        // 将当前点添加到 points
        if (this.measureComplete == true) {
          // 不完全关闭响应事件
          this.measureComplete = false;
          this.clearAll();
        }
        const point = createPointItem(e.lngLat);
        this.pointsGeojson.features.push(point);
      }

      // 根据当前现有的 points 中的点，绘制lines中的数据
      if (this.pointsGeojson.features.length > 1) {
        this.lineString.geometry.coordinates = this.pointsGeojson.features.map(function (point: any) {
          return point.geometry.coordinates;
        });
      }

      // 清空所有的Marker
      for (const e of this.markers) {
        e.remove();
      }
      const coords = [];
      for (let i = 0; i < this.pointsGeojson.features.length; i++) {
        const item = this.pointsGeojson.features[i];
        coords.push(item.geometry.coordinates);
        const ele = document.createElement('span');
        ele.setAttribute('class', 'my-measure-line-div');
        const option: MarkerOptions = {
          element: ele,
          anchor: 'left',
          offset: [8, 0],
        };
        ele.innerHTML = i === 0 ? '起点' : measureLength(coords) + '';
        if (this.map) {
          const marker = new maplibregl.Marker(option)
            .setLngLat([item.geometry.coordinates[0], item.geometry.coordinates[1]])
            .addTo(this.map);
          this.markers.push(marker);
        }
      }

      // 刷新 点 和线
      this.setPointLayer(this.pointsGeojson.features);
      // (this.map.getSource('measure-line-points-source') as any).setData(this.pointsGeojson);
      this.setLineLayer([this.lineString]);
      // (this.map.getSource('measure-line-lines-source') as any).setData(this.linesGeojson);
    }, 0);
  };

  // 鼠标移动事件
  private lineMoveFn = (e: MapMouseEvent) => {
    const features = this.map.queryRenderedFeatures(e.point, {
      layers: ['measure-line-points-layer'],
    });
    this.map.getCanvas().style.cursor = features.length > 0 ? 'pointer' : 'crosshair';
    if (!this.measureComplete && this.pointsGeojson.features.length > 0) {
      // 存在至少一个点，此时才绘制虚线
      const index = this.pointsGeojson.features.length - 1;
      this.lineMoveString.geometry.coordinates = [
        this.pointsGeojson.features[index].geometry.coordinates,
        [e.lngLat.lng, e.lngLat.lat],
      ];
      this.lineMoveGeojson.features = [this.lineMoveString];
      // (this.map.getSource('measure-line-line-move-source') as any).setData(this.lineMoveGeojson);
      this.setLineMovelayer([this.lineMoveString]);
    }
  };

  // 鼠标双击事件
  /**
   * 双击会触发两次单机，双击也相当于触发了一次单机
   * 第二次单机和双击在一个事件循环中，被清除掉了。
   */
  private dblclickFn = () => {
    if (!this.measureComplete && this.pointsGeojson.features.length > 1) {
      clearTimeout(this.timeout);
      this.measureComplete = true;

      // 取消 linemovegeojson 中数据
      this.setLineMovelayer([]);
    }
  };

  // 取消所有的鼠标事件监听
  private deleteEvent = () => {
    // 双击取消所有事件绑定
    this.map.off('click', this.clickFn);
    this.map.off('mousemove', this.lineMoveFn);
    this.map.off('dblclick', this.dblclickFn);
  };

  // 设置数据
  private setPointLayer(list: myFeature[]) {
    this.pointsGeojson.features = list;
    (this.map.getSource('measure-line-points-source') as any).setData(this.pointsGeojson);
  }

  // 清除线数据
  private setLineLayer(list: myFeature[]) {
    this.linesGeojson.features = list;
    (this.map.getSource('measure-line-lines-source') as any).setData(this.linesGeojson);
  }

  // 清除移动的虚线数据
  private setLineMovelayer(list: myFeature[]) {
    this.lineMoveGeojson.features = list;
    (this.map.getSource('measure-line-line-move-source') as any).setData(this.lineMoveGeojson);
  }
}

/**
 * 测距函数，测量所有点连线的距离
 *
 * units: 单位，范围包括: degrees, radians, miles, kilometers, 默认: kilometers
 *
 * fixed: 返回结果小数点后保留位数，默认为2，不限制传入：-1
 */
function measureLength(coors: any[], units: Units = 'kilometers', fixed = 2) {
  const line = turf.lineString(coors);
  const map = [
    { key: 'kilometers', unit: '千米' },
    { key: 'miles', unit: '英里' },
    { key: 'degrees', unit: '度' },
    { key: 'radians', unit: '弧度' },
  ];
  const item = map.find((e) => e.key == units);
  const unit = item ? item.unit : '';
  return fixed < 0
    ? turf.length(line, { units: units }) + unit
    : Number(turf.length(line, { units: units })).toFixed(fixed) + unit;
}
