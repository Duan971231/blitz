<template>
  <div class="map-wrapper">
    <div id="map"></div>
    <div class="lnglat-box">
      <span>经度：{{ latlng.lng }}</span>
      <span>纬度：{{ latlng.lat }}</span>
    </div>
    <MapTool class="map-tool" @changeTool="changeTool"></MapTool>
    <mapToolBox class="map-tool-box" @toolChange="toolBoxChange"></mapToolBox>
  </div>
</template>

<script setup lang="ts">
import { Map } from 'maplibre-gl';
import { onBeforeUnmount, onMounted, reactive } from 'vue';

import { MaplibreMap } from '@/common/map/maplibre';
import mapToolBox from '@/components/MapToolBox/map-tool-box.vue';
import MapTool from '@/components/MapToolList/map-tool.vue';
import { Capture } from '@/utils/mapbox/capture';
import { DrwaPoint } from '@/utils/mapbox/draw-point';
import { MeasureArea } from '@/utils/mapbox/measure-area';
import { MeasureLine } from '@/utils/mapbox/measure-line';
let dMap: Map | null;
let mapDom: HTMLElement | null;
let captureControl: Capture;
let measureLineControl: MeasureLine;
let measureAreaControl: MeasureArea;
let drawPointControl: DrwaPoint;
const latlng = reactive({
  lat: '',
  lng: '',
});
onMounted(() => {
  mapDom = document.querySelector('#map');
  if (!dMap) {
    dMap = new MaplibreMap('map').maplibreMap;
    captureControl = new Capture(dMap);
    measureLineControl = new MeasureLine(dMap);
    measureAreaControl = new MeasureArea(dMap);
    drawPointControl = new DrwaPoint(dMap);
    // 添加绑定事件
    dMap.on('mousemove', (e) => {
      latlng.lat = e.lngLat.lat.toFixed(3);
      latlng.lng = e.lngLat.lng.toFixed(3);
    });
  }
});
onBeforeUnmount(() => {
  // 部署后，存在BUG，每次切换 tab 时，不能销毁资源
  while (mapDom?.firstChild) {
    mapDom.firstChild.remove();
  }
  dMap = null;
});

const changeTool = (newValue: string, oldValue: string) => {
  // 点
  if (newValue == 'point') {
    drawPointControl.start();
  } else if (oldValue == 'point') {
    drawPointControl.cancel();
  }
  // 测线
  if (newValue == 'line') {
    measureLineControl.start();
  } else if (oldValue == 'line') {
    measureLineControl.cancel();
  }
  // 测面
  if (newValue == 'area') {
    measureAreaControl.start();
  } else if (oldValue == 'area') {
    measureAreaControl.cancel();
  }
};
const toolBoxChange = (toolType: string) => {
  if (toolType == 'capture') {
    captureControl.start();
  }
};
</script>
<style lang="less" scoped>
.map-wrapper {
  position: relative;
  transform: translate(0, 0);
  #map {
    position: fixed;
    height: 100%;
    width: 100%;
  }
  .lnglat-box {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: 210px;
    display: flex;
    justify-content: space-around;
    span {
      flex: 1;
    }
  }
  .map-tool {
    position: fixed;
    top: 0;
  }
  .map-tool-box {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
