<template>
  <div class="base-layout">
    <div class="title">
      <img src="@/assets/images/logo.png" alt="" />
    </div>
    <div class="pic_container">
      <div v-for="entry in entryMap" :key="entry.code" class="pic_div" @click="routerChange(entry.url)">
        <img draggable="false" :src="getImageUrl(entry.bgName)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const entryMap = ref([
  { name: '首页', code: '1', bgName: 'system1', url: '/index' },
  { name: '地图', code: '2', bgName: 'system2', url: '/map' },
  { name: 'canvas', code: '3', bgName: 'system3', url: '/canvas' },
  { name: '实验室', code: '4', bgName: 'system4', url: '/test' },
]);
const getImageUrl = (url: string) => {
  return new URL(`../../assets/images/home/${url}.png`, import.meta.url).href;
};
const routerChange = (url: string) => {
  router.push(url);
};
</script>

<style lang="less" scoped>
.base-layout {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/bk.jpg');
  background-size: 100% 100%;
  position: relative;
  overflow-y: auto;
  .title {
    width: 100%;
    display: flex;
    height: 300px;
    justify-content: center;
    align-items: center;
    img {
      max-height: 100%;
      max-width: 100%;
    }
  }
  .pic_container {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: center;
    padding-top: 30px;

    .pic_div {
      display: flex;
      justify-content: center;
      width: 25%;

      a {
        display: block;
        width: 60%;
        cursor: pointer;

        img {
          display: block;
          width: 100%;
          cursor: pointer;
        }
      }

      img {
        display: block;
        width: 60%;
        cursor: pointer;
      }
    }
  }
}
</style>
