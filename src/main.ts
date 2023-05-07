import './style.css';
import 'highlight.js/styles/tomorrow-night-bright.css'; //样式
import '@/assets/iconfont/iconfont.css';
import 'maplibre-gl/dist/maplibre-gl.css'; // 地图坐标位置

import hljs from 'highlight.js';
import { createApp } from 'vue';

import App from './App.vue';
import rootRoutes from './router/index';

// import 'highlight.js/styles/kimbie-dark.css' //样式

const app = createApp(App);

//创建v-highlight全局指令
app.directive('highlight', function (el: any) {
  const blocks = el.querySelectorAll('code');
  for (const block of blocks) {
    hljs.highlightElement(block);
  }
});

app.use(rootRoutes);
app.mount('#app');
