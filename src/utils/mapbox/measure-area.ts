import * as turf from '@turf/turf';
import { CirclePaintProps, FillPaintProps, LinePaintProps, Map, MapMouseEvent, Marker } from 'maplibre-gl';
import maplibregl from 'maplibre-gl';

import { createEmpty, createPointItem, initGeoJson, myFeature, pointsToArea, pointsToline } from './geojson-init';

export class MeasureArea {
  private map: Map;

  private pointsGeojson = initGeoJson(); // 点

  private linesGeojson = initGeoJson(); // 两条虚线

  private areaGeojson = initGeoJson(); // 区域

  private areaMoveGeojson = initGeoJson(); // 区域边界

  private areaMoveLineString = createEmpty('LineString'); // 鼠标移动的时候，显示的虚线

  private measureBo = false; // 判度胺当前功能是否是打开的

  private measureComplete = true; // 当前侧面是否绘制完成

  private timeout: any = undefined; // 用来判断是单机还是双击

  private marker: Marker | undefined = undefined;

  constructor(map: Map) {
    this.map = map;
  }

  start() {
    if (this.measureBo == false) {
      // 打开测量区域
      this.measureBo = true;

      // 禁止双击缩放
      this.map.doubleClickZoom.disable();
      this.map.getCanvas().style.cursor = 'crosshair';

      // this.deleteEvent()
      // this.clearAll()
      // 绑定事件
      this.map.on('click', this.clickFn);
      this.map.on('mousemove', this.areaMoveFn);
      this.map.on('dblclick', this.dblclickFn);
      this.measureComplete = true;

      // 添加资源
      if (!this.map.getSource('measure-area-points-source')) {
        this.map.addSource('measure-area-points-source', {
          type: 'geojson',
          data: this.pointsGeojson,
        });
      }
      if (!this.map.getSource('measure-area-move-source')) {
        this.map.addSource('measure-area-move-source', {
          type: 'geojson',
          data: this.areaMoveGeojson,
        });
      }
      if (!this.map.getSource('measure-area-area-source')) {
        this.map.addSource('measure-area-area-source', {
          type: 'geojson',
          data: this.areaGeojson,
        });
      }
      if (!this.map.getSource('measure-area-line-source')) {
        this.map.addSource('measure-area-line-source', {
          type: 'geojson',
          data: this.linesGeojson,
        });
      }
      // 添加图层
      if (!this.map.getLayer('measure-area-point-layer')) {
        this.map?.addLayer({
          id: 'measure-area-point-layer',
          type: 'circle',
          source: 'measure-area-points-source',
          paint: {
            'circle-radius': 5,
            'circle-color': '#F00',
            'circle-opacity': 0.85,
          },
          filter: ['in', '$type', 'Point'],
        });
      }
      if (!this.map.getLayer('measure-area-line-layer')) {
        this.map?.addLayer({
          id: 'measure-area-line-layer',
          type: 'line',
          source: 'measure-area-line-source',
          paint: {
            'line-color': '#F00',
            'line-width': 2,
            'line-opacity': 0.75,
          },
          filter: ['in', '$type', 'LineString'],
        });
      }
      if (!this.map.getLayer('measure-area-area-layer')) {
        this.map?.addLayer({
          id: 'measure-area-area-layer',
          type: 'fill',
          source: 'measure-area-area-source',
          paint: {
            'fill-color': '#F00',
            'fill-opacity': 0.5,
          },
        });
      }
      if (!this.map.getLayer('measure-area-move-layer')) {
        this.map?.addLayer({
          id: 'measure-area-move-layer',
          type: 'line',
          source: 'measure-area-move-source',
          paint: {
            'line-color': '#F00',
            'line-width': 2,
            'line-opacity': 0.75,
            'line-dasharray': [2, 4],
          },
          filter: ['in', '$type', 'LineString'],
        });
      }
    }
  }

  /**
   * 取消正在进行的测面操作
   */
  cancel = () => {
    this.measureBo = false;
    this.map.doubleClickZoom.enable();
    this.deleteEvent();
    this.clearAll();
    this.map.getCanvas().style.cursor = '';
    this.measureComplete = true;

    // 清除 layer
    if (this.map.getLayer('measure-area-move-layer')) {
      this.map.removeLayer('measure-area-move-layer');
    }
    if (this.map.getLayer('measure-area-area-layer')) {
      this.map.removeLayer('measure-area-area-layer');
    }
    if (this.map.getLayer('measure-area-line-layer')) {
      this.map.removeLayer('measure-area-line-layer');
    }
    if (this.map.getLayer('measure-area-point-layer')) {
      this.map.removeLayer('measure-area-point-layer');
    }
    // 清除 source
    if (this.map.getSource('measure-area-points-source')) {
      this.map.removeSource('measure-area-points-source');
    }
    if (this.map.getSource('measure-area-move-source')) {
      this.map.removeSource('measure-area-move-source');
    }
    if (this.map.getSource('measure-area-area-source')) {
      this.map.removeSource('measure-area-area-source');
    }
    if (this.map.getSource('measure-area-line-source')) {
      this.map.removeSource('measure-area-line-source');
    }
  };

  /**
   * 修改点图层的样式
   */
  changePointStyle(styleList: CirclePaintProps) {
    for (const key in styleList) {
      this.map.setPaintProperty('measure-area-point-layer', key, styleList[key as keyof typeof styleList]);
    }
  }

  /**
   * 修改线样式
   */
  changeLineStyle(styleList: LinePaintProps) {
    for (const key in styleList) {
      if (key.includes('line-dasharray')) {
        this.map.setPaintProperty('measure-area-move-layer', key, styleList[key as keyof typeof styleList]);
      } else {
        this.map.setPaintProperty('measure-area-move-layer', key, styleList[key as keyof typeof styleList]);
        this.map.setPaintProperty('measure-area-line-layer', key, styleList[key as keyof typeof styleList]);
      }
    }
  }

  /**
   * 修改填充样式
   */
  changeAreaStyle(styleList: FillPaintProps) {
    for (const key in styleList) {
      this.map.setPaintProperty('measure-area-area-layer', key, styleList[key as keyof typeof styleList]);
    }
  }

  // 单击函数
  private clickFn = (e: MapMouseEvent) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      const features = this.map?.queryRenderedFeatures(e.point, {
        layers: ['measure-area-point-layer'],
      });
      if (features.length > 0) {
        const id = features[0].properties.id;
        // 点击已经存在的点，取消当前的点。
        this.pointsGeojson.features = this.pointsGeojson.features.filter((f: any) => {
          return f.properties.id != id;
        });
      } else {
        if (this.measureComplete == true) {
          this.measureComplete = false;
          this.clearAll();
        }
        // 新添加一个点
        const point = createPointItem(e.lngLat);
        this.pointsGeojson.features.push(point);
      }
      this.setPointsLayer(this.pointsGeojson.features);
      // console.log(pointsToline(this.pointsGeojson.features));
      this.setLineLayer([pointsToline(this.pointsGeojson.features)]);
      if (this.measureComplete == true) {
        this.setDbclickLine();
      }
      if (this.pointsGeojson.features.length > 2) {
        this.setAreaLayer([pointsToArea(this.pointsGeojson.features)]);
        if (this.measureComplete == true) {
          this.measureAreaFn();
        }
      } else {
        if (this.measureComplete == true) {
          this.clearAll();
        }
      }
    }, 0);
  };

  private areaMoveFn = (e: MapMouseEvent) => {
    const features = this.map?.queryRenderedFeatures(e.point, {
      layers: ['measure-area-point-layer'],
    });
    this.map.getCanvas().style.cursor = features.length > 0 ? 'pointer' : 'crosshair';
    if (!this.measureComplete && this.pointsGeojson.features.length > 1) {
      // 至少存在两个点，鼠标移动才显示虚线
      const index = this.pointsGeojson.features.length - 1;
      this.areaMoveLineString.geometry.coordinates = [
        this.pointsGeojson.features[0].geometry.coordinates,
        [e.lngLat.lng, e.lngLat.lat],
        this.pointsGeojson.features[index].geometry.coordinates,
      ];
      this.setLineMoveLayer([this.areaMoveLineString]);
    }
  };

  /**
   * 双击取消侧面功能
   */
  private dblclickFn = () => {
    if (!this.measureComplete && this.pointsGeojson.features.length > 2) {
      clearTimeout(this.timeout);
      this.measureComplete = true;
      this.setLineMoveLayer([]);
      // 设置终点和当前点的线段
      this.setDbclickLine();
      this.measureAreaFn();
    }
  };

  /**
   * 计算面积
   */
  measureAreaFn() {
    // 清除marker
    if (this.marker) {
      this.marker.remove();
    }
    // 计算面积
    // 获取中心点
    const coord = this.areaGeojson.features[0].geometry.coordinates;
    const polygon = turf.polygon(coord);
    const center = turf.centerOfMass(polygon);
    const area = turf.area(polygon); // 面积
    const ele = document.createElement('div');
    ele.setAttribute('class', 'my-measure-line-div');
    ele.innerHTML = area + ' 平方米';
    this.marker = new maplibregl.Marker({
      element: ele,
      anchor: 'left',
    })
      .setLngLat([center.geometry.coordinates[0], center.geometry.coordinates[1]])
      .addTo(this.map);
  }

  /**
   * 取消所有事件绑定
   */
  private deleteEvent() {
    // 双击取消所有事件绑定
    this.map.off('click', this.clickFn);
    this.map.off('mousemove', this.areaMoveFn);
    this.map.off('dblclick', this.dblclickFn);
  }

  /**
   * 设置点
   */
  private setPointsLayer(list: myFeature[]) {
    this.pointsGeojson.features = list;
    (this.map.getSource('measure-area-points-source') as any).setData(this.pointsGeojson);
  }

  /**
   * 设置区域边界
   */
  private setLineLayer(list: myFeature[]) {
    this.linesGeojson.features = list;
    (this.map.getSource('measure-area-line-source') as any).setData(this.linesGeojson);
  }

  /**
   * 设置区域移动
   */
  private setLineMoveLayer(list: myFeature[]) {
    this.areaMoveGeojson.features = list;
    (this.map.getSource('measure-area-move-source') as any).setData(this.areaMoveGeojson);
  }

  /**
   * 设置区域
   */
  private setAreaLayer(list: myFeature[]) {
    this.areaGeojson.features = list;
    (this.map.getSource('measure-area-area-source') as any).setData(this.areaGeojson);
  }

  private setDbclickLine() {
    const tempLine = createEmpty('LineString');
    const index = this.pointsGeojson.features.length - 1;
    tempLine.geometry.coordinates.push(
      this.pointsGeojson.features[index].geometry.coordinates,
      this.pointsGeojson.features[0].geometry.coordinates,
    );
    this.linesGeojson.features.push(tempLine);
    this.setLineLayer(this.linesGeojson.features);
  }

  /**
   * 取消所有图层数据
   */
  private clearAll() {
    this.areaMoveLineString = createEmpty('LineString');
    this.setAreaLayer([]);
    this.setLineLayer([]);
    this.setLineMoveLayer([]);
    this.setPointsLayer([]);
    this.marker?.remove();
  }
}
