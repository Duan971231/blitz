<template>
  <div ref="tableContainer">
    <a-table v-bind="props" :scroll="initialScroll" @change="pageChange">
      <template #headerCell="{ column }">
        <slot name="headerCell" :column="column" />
      </template>
      <template #bodyCell="{ column, record, text }">
        <slot name="bodyCell" :record="record" :column="column" :text="text" />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import tableScroll from '@/common/hooks/table-scroll-injector';

interface TablePropsITF {
  dataSource: any[];
  columns: any[];
  rowKey?: string;
  loading?: boolean;
  rowSelection?: any;
  pagination?: { current: number; pageSize: number; total: number; showQuickJumper?: boolean } | boolean;
}

const emits = defineEmits<{
  (e: 'change', pageData: any): void;
}>();

const props = withDefaults(defineProps<TablePropsITF>(), {
  dataSource: () => [],
  columns: () => [],
  rowKey: 'id',
  loading: false,
  pagination: () => {
    return {
      current: 1,
      pageSize: 20,
      total: 0,
    };
  },
});

const pageChange = (pageData: any) => {
  emits('change', pageData);
};
const { tableContainer, initialScroll } = tableScroll(!!props.pagination);
</script>

<style scoped lang="less"></style>
