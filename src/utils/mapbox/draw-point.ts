import maplibregl, { Map, MapMouseEvent, Marker, MarkerOptions } from 'maplibre-gl';

import { createPointItem, initGeoJson } from './geojson-init';

export class DrwaPoint {
  private map: Map;

  private drawBo = false; // 判断当前功能是否打开了

  private pointsGeojson = initGeoJson(); // 点

  private markers: Marker[] = [];

  constructor(map: Map) {
    this.map = map;
  }

  /**
   * 开始绘制
   */
  start() {
    if (!this.drawBo) {
      this.drawBo = true;
      // 禁止双击缩放
      console.log('quxiao');
      this.map.doubleClickZoom.disable();

      // 绑定事件
      this.map.on('click', this.clickFn);
      this.map.on('mousemove', this.mouseMoveFn);

      // 添加资源
      if (!this.map.getSource('draw-point-source')) {
        this.map.addSource('draw-point-source', {
          type: 'geojson',
          data: this.pointsGeojson,
        });
      }
      // 添加图层
      if (!this.map.getLayer('draw-point-layer')) {
        this.map.addLayer({
          id: 'draw-point-layer',
          type: 'circle',
          source: 'draw-point-source',
          paint: {
            'circle-radius': 5,
            'circle-color': '#00F',
            'circle-opacity': 0.85,
          },
          filter: ['in', '$type', 'Point'],
        });
      }
    }
  }

  /**
   * 取消功能
   */
  cancel() {
    if (this.drawBo) {
      this.drawBo = false;
      this.map.doubleClickZoom.enable();
      this.map.off('click', this.clickFn);
      this.map.off('mousemove', this.mouseMoveFn);
      this.map.getCanvas().style.cursor = '';
      // 清除资源
      for (const e of this.markers) {
        e.remove();
      }
      this.pointsGeojson.features = [];
      (this.map.getSource('draw-point-source') as any).setData(this.pointsGeojson);
      this.map.removeLayer('draw-point-layer');
      this.map.removeSource('draw-point-source');
    }
  }

  /**
   * 鼠标点击事件
   */
  private clickFn = (e: MapMouseEvent) => {
    // 判断当前点是否被点击过了
    const features = this.map.queryRenderedFeatures(e.point, {
      layers: ['draw-point-layer'],
    });
    if (features.length > 0) {
      // 如果当前点已经存在的话，将当前点从points中去除
      const id = features[0].properties.id;
      this.pointsGeojson.features = this.pointsGeojson.features.filter((point: any) => {
        return point.properties.id != id;
      });
    } else {
      const point = createPointItem(e.lngLat, {
        label: `${e.lngLat.lng.toFixed(2)}, ${e.lngLat.lat.toFixed(2)}`,
      });
      this.pointsGeojson.features.push(point);
    }
    // 清空所有的 marker 重新绘制
    // 清空所有的Marker
    for (const e of this.markers) {
      e.remove();
    }
    for (let i = 0; i < this.pointsGeojson.features.length; i++) {
      const item = this.pointsGeojson.features[i];
      const ele = document.createElement('span');
      ele.setAttribute('class', 'my-measure-line-div');
      const option: MarkerOptions = {
        element: ele,
        anchor: 'left',
        offset: [8, 0],
      };
      ele.innerHTML = item.properties.label ?? '';
      if (this.map) {
        const marker = new maplibregl.Marker(option)
          .setLngLat([item.geometry.coordinates[0], item.geometry.coordinates[1]])
          .addTo(this.map);
        this.markers.push(marker);
      }
    }
    (this.map.getSource('draw-point-source') as any).setData(this.pointsGeojson);
  };

  /**
   * 鼠标移动事件
   */
  private mouseMoveFn = (e: MapMouseEvent) => {
    const features = this.map.queryRenderedFeatures(e.point, {
      layers: ['draw-point-layer'],
    });
    this.map.getCanvas().style.cursor = features.length > 0 ? 'pointer' : 'crosshair';
  };
}
