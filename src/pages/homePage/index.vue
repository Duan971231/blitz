<template>
  <div class="d-home-page">
    <div class="d-home-header">
      <div class="d-header-content">
      </div>
    </div>
    <div class="d-home-wrapper d-overflow-y">
      <div  ref="markedRef" v-html="code"></div>
      <div  @click="click">btn</div>
    </div>
  </div>
</template>
<script lang="ts">
export default {

}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css';

const code = ref('``` 1234 ```')
const markedRef = ref()

onMounted(() => {
  const rendererMD = new marked.Renderer();
  marked.setOptions({
  renderer: rendererMD,
  highlight: function(code: any) {
    console.log(code)
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  langPrefix: "hljs language-"
})
code.value = marked(code.value)
  markedRef.value.innerHTML = marked('# Canvas 基本用法\n`canvas` ``` 123 ``` 标签只有两个属性---`width` 和 `height`。当没有设置宽度和高度的时候，canvas 会初始化宽度为 300 像素和高度为 150像素。')
})
const click = () => {
code.value = marked(code.value)
}
</script>
<style lang="less" scoped>
  .d-home-page {
    width: 100%;
    height: 100%;
    .d-home-header {
      background-color: #3F4657;
      .d-header-content {
        max-width: 1200px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  @media (min-width: 1200px) {
    .d-home-header {
      height: 60px;
    }
    .d-home-wrapper {
      height: calc(100% - 60px);
    }
  }
  @media (max-width: 1199px) {
    .d-home-header {
      height: 80px;
    }
    .d-home-wrapper {
      height: calc(100% - 80px);
    }
  }
</style>