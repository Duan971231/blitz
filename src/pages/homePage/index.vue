<template>
  <div class="d-home-page">
    <div class="d-home-header">
      <div class="d-header-content">
      </div>
    </div>
    <div class="d-home-wrapper d-overflow-y">
      <div v-highlight ref="markedRef" v-html="code"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { marked } from 'marked'

import testMd from '../../mds/test.md?raw'
console.log(testMd)

const code = ref('')
code.value = marked(testMd)

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