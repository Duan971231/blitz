import { LngLat } from 'maplibre-gl';

export interface myFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: any[];
  };
  properties: {
    id: string;
    [propName: string]: any;
  };
}

// 初始化空的 geojson
export function initGeoJson() {
  const features: myFeature[] = [];
  return {
    type: 'FeatureCollection',
    features: features,
  };
}

// 生成 Features 中的 内容
export function createPointItem(lngLat: LngLat, options?: object) {
  const point: myFeature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lngLat.lng, lngLat.lat],
    },
    properties: {
      id: String(Date.now()),
      ...options,
    },
  };
  return point;
}

// 生成 line
export function createEmpty(type: string): myFeature {
  return {
    type: 'Feature',
    geometry: {
      type: type,
      coordinates: [],
    },
    properties: {
      id: String(Date.now()),
    },
  };
}

// 生成 Polygon
export function createPolygonItem(lngLat: LngLat) {
  const point: myFeature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [lngLat.lng, lngLat.lat],
          [lngLat.lng, lngLat.lat],
        ],
      ],
    },
    properties: {
      id: String(Date.now()),
    },
  };
  return point;
}

/**
 *  根据 points 中的点，生成开口线条
 */
export function pointsToline(points: myFeature[]): myFeature {
  const pointsArr = [];
  if (points.length > 1) {
    for (const coord of points) {
      pointsArr.push(coord.geometry.coordinates);
    }
  } else if (points.length == 1) {
    pointsArr.push(points[0].geometry.coordinates, points[0].geometry.coordinates);
  }
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: pointsArr,
    },
    properties: {
      id: String(Date.now()),
    },
  };
}

// 根据 point 中的点，生成面积
export function pointsToArea(points: myFeature[]): myFeature {
  const pointsArr = [];
  if (points.length > 0) {
    for (const coord of points) {
      pointsArr.push(coord.geometry.coordinates);
    }
    pointsArr.push(points[0].geometry.coordinates);
  }
  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [pointsArr],
    },
    properties: {
      id: String(Date.now()),
    },
  };
}
