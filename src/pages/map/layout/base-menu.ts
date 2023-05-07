export interface MenuData {
  name: string;
  key?: string;
  icon?: string;
  path?: string;
  children?: MenuData[];
}

const menuData: MenuData[] = [
  {
    name: 'mapbox',
    key: 'mapbox-map',
    path: '/map/mapbox',
  },
  {
    name: 'cesium',
    key: 'cesium-map',
    path: '/map/cesium',
  },
];

export default menuData;
