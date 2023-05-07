<template>
  <div class="map-tool">
    <a-radio-group v-model:value="value" @change="changeTool">
      <a-radio v-for="item in toolList" :key="item.value" :style="radioStyle" :value="item.value">{{
        item.label
      }}</a-radio>
    </a-radio-group>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

import { toolConfig } from './config';
const toolList = reactive(toolConfig);
const emit = defineEmits(['changeTool']);

const value = ref<number | string>('');
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});
watch(
  () => value.value,
  (newValue, oldValue) => {
    emit('changeTool', newValue, oldValue);
  },
);

const changeTool = (value: any) => {
  console.log(value);
};
</script>
<style lang="less" scoped>
.map-tool {
  width: 100px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
