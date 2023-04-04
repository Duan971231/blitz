import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import rootRoutes from './router/index';
import '@/assets/iconfont/iconfont.css';

const app = createApp(App);

import hljs from 'highlight.js';
// import 'highlight.js/styles/felipec.css' //样式
import 'highlight.js/styles/tomorrow-night-bright.css'; //样式
// import 'highlight.js/styles/kimbie-dark.css' //样式

//创建v-highlight全局指令
app.directive('highlight', function (el: any) {
  let blocks = el.querySelectorAll('code');
  blocks.forEach((block: any) => {
    hljs.highlightElement(block);
  });
});

app.use(rootRoutes);
app.mount('#app');
