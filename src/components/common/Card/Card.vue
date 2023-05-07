<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="header-title margin-b-15">
      <slot name="cardHeader" :title="route.meta.title">
        {{ route.meta.title }}
      </slot>
    </div>
    <div class="content-container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  overflow: auto;
  background: #ffffff;
  width: 100%;
  height: 100%;
  .content-container {
    flex: 1;
    overflow: hidden;
  }
}
</style>
