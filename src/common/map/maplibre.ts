import { Map, MapOptions } from 'maplibre-gl';
export class MaplibreMap {
  maplibreMap: Map;

  constructor(mapId: string | HTMLElement, options?: object) {
    const newMapOption: MapOptions = {
      container: mapId,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: [107.8173, 29.9625],
      zoom: 3,
      pitch: 0,
      minZoom: 3,
      maxZoom: 13,
      preserveDrawingBuffer: true,
      attributionControl: false,
      // dragRotate: false,  // 禁用右键视角旋转
      ...options,
    };
    this.maplibreMap = new Map(newMapOption);
  }
}
