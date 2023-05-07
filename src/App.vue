<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="less">
.d-overflow-y {
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: rgba(240, 240, 240, 0);
  }

  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 1);
    border-radius: 20px;
    background-color: rgba(240, 240, 240, 1);
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    box-shadow: inset 0 0 0px #999;
    background-color: #999;
  }
}
</style>
