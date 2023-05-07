<template>
  <a-form style="margin-bottom: 20px" v-bind="formLayout" :model="formState" ref="formRef">
    <a-row style="width: 100%">
      <a-col class="margin-r-10" v-for="item of filterList" :key="item.key" :span="item.span || 6">
        <a-form-item :label="item.label" :name="item.key">
          <component
            :is="componentEnum[item.comType]"
            placeholder="请输入"
            v-bind="item.props"
            v-on="item.on || {}"
            v-model:value="formState[item.key]"
          />
        </a-form-item>
      </a-col>
      <a-col class="btn-container">
        <a-button type="primary" @click="handleSearch" class="margin-r-10">
          <template #icon><SearchOutlined /></template>
          搜索</a-button
        >
        <a-button @click="handleReset" v-if="!hiddenResetBtn">重置</a-button>
        <a-row style="flex: 1" align="middle" :justify="btnJustify || 'start'">
          <slot name="btnContent" />
        </a-row>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';
import { FormInstance, Input, Select } from 'ant-design-vue';
import { markRaw, reactive, ref, toRaw, watch } from 'vue';

const formRef = ref<FormInstance>();

const componentEnum: any = {
  input: markRaw(Input),
  select: markRaw(Select),
};

const formLayout = { layout: 'inline' };
const props = defineProps<{
  filterList: any[];
  hiddenResetBtn?: boolean;
  btnJustify?: 'start' | 'end' | 'space-between' | 'space-around';
}>();
const formState = reactive<any>({});

watch(
  () => props.filterList,
  (val: any) => {
    // eslint-disable-next-line unicorn/no-array-for-each
    val.forEach((item: any) => {
      formState[item.key] = item.value;
    });
  },
  {
    immediate: true,
  },
);

const emits = defineEmits<{
  (e: 'search', payload: any): void;
  (e: 'reset', payload: any): void;
}>();

function handleReset() {
  formRef.value?.resetFields();
  emits('reset', {});
}
function handleSearch() {
  emits('search', toRaw(formState));
}
</script>

<style scoped lang="less">
.btn-container {
  flex: 1;
  display: flex;
}
</style>
