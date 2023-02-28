<template>
  <div class="d-button-com">
    <div class="d-border-bottom"></div>
    <div class="d-border-top"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="less" scoped>
@color: #efc683;
.d-button-com {
  display: inline-block;
  cursor: pointer;
  transition: all 0.8s;
  // background-color: pink;
  padding: 5px 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .d-border-bottom {
    width: calc(100% - 20px);
    height: 1px;
    top: calc(100% - 2px);
    left: 100%;
    position: absolute;
    background-color: @color;
    z-index: 2;
    transition: all 0.8s;
  }
  .d-border-top {
    width: calc(100% - 20px);
    height: 1px;
    top: 0;
    right: 100%;
    position: absolute;
    background-color: @color;
    z-index: 2;
    transition: all 0.8s;
  }
  &:hover {
    color: @color;
    .d-border-bottom {
      left: 10px;
    }
    .d-border-top {
      right: 10px;
    }
  }
}
</style>
