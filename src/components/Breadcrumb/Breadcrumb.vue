<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a-breadcrumb v-if="breadcrumList?.length" class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadcrumList" :key="item.path" @click="itemClick(item.path)">
      <router-link v-if="index !== breadcrumList.length - 1 && item.path && !item.leafRoot" :to="{ path: item.path }">{{
        item.label
      }}</router-link>
      <span v-else>{{ item.label }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
  <span v-else>{{ route.meta.name }}</span>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RouteRecordNormalized, useRoute } from 'vue-router';

interface breadcrumbItemITF {
  label: string | unknown;
  path: string;
  leafRoot: boolean;
}

const route = useRoute();

const breadcrumList = ref<breadcrumbItemITF[]>([]);
// const query = ref<LocationQuery>(route.query);

function resolveItems(matched: RouteRecordNormalized[]) {
  breadcrumList.value = matched
    .filter((m) => m.meta.title)
    .map((m) => ({ path: m.path, label: m.meta.title, leafRoot: Boolean(m.meta.leafRoot) }));
}

watch(
  () => route.matched,
  (matched) => {
    // eslint-disable-next-line no-unused-expressions
    matched && matched?.length && resolveItems(matched);
  },
);
const emits = defineEmits<{
  (e: 'setSelectKey'): void;
}>();

function itemClick(path: string) {
  if (path === '/home') {
    emits('setSelectKey');
  }
}

onMounted(() => {
  resolveItems(route.matched);
});
</script>

<style scoped>
.breadcrumb {
  background: #fff;
  height: 40px;
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
}
</style>
