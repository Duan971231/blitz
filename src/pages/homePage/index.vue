<template>
  <div class="d-home-page" ref="homePageRef">
    <div class="d-home-header">
      <div class="d-header-content">
        <span class="d-header-name">【德武庵】</span>
        <div class="d-header-icons">
          <HeaderButton class="d-header-icon">首页</HeaderButton>
          <HeaderButton class="d-header-icon">首页</HeaderButton>
          <HeaderButton class="d-header-icon">首页</HeaderButton>
          <HeaderButton class="d-header-icon">首页</HeaderButton>
        </div>
      </div>
    </div>
    <div class="d-home-wrapper">
      <div class="d-wrapper d-overflow-y">
        <div class="d-wrapper-content ">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { RouterView } from 'vue-router';
import HeaderButton from '@/components/HeaderButton/index.vue'
import testMd from '../../mds/test.md?raw'

const code = ref('')
const homePageRef = ref()
code.value = marked(testMd)

const showType = ref('big') // small or big
/** 判定屏幕是大屏还是小屏 */
const setType = () => {
  const { width } = homePageRef.value.getBoundingClientRect()
    if (width >= 1200) {
      showType.value = 'big'
    } else {
      showType.value = 'small'
    }
}


onMounted(() => {
  setType();
  window.addEventListener('resize', () => {
    setType();
  })
})

</script>
<style lang="less" scoped>
  .d-home-page {
    width: 100%;
    height: 100%;
    .d-home-header {
      background-color: #3F4657;
      display: flex;
      justify-content: center;
      .d-header-content {
        max-width: 1200px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .d-header-name {
          font-size: 24px;
          font-weight: bold;
          color: #fff;
        }
      }
    }
    .d-home-wrapper {
      overflow: hidden;
      .d-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      }
      .d-wrapper-content {
        max-width: 1200px;
        width: 100%;
      }
    }
  }

  @media (min-width: 1200px) {
    .d-home-header {
      height: 60px;
      .d-header-content {
        align-items: center;
        padding: 0 1rem;
        color: #fff;
        .d-header-icons {
          display: flex;
          .d-header-icon {

          }
          .d-header-icon + .d-header-icon {
            margin-left: 1rem;
          }
        }
      }
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