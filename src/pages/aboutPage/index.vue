<template>
  <div class="d-about-page">
    <div class="d-about-wrapper">
      <div class="d-about-item">
        <div class="d-title">2023-02-28</div>
        <div class="d-content">
          经过深思熟路，本博客正式开始，不清楚这个博客的作用，不清楚这个博客能否发布，先当技术练手了。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.d-about-page {
  .d-about-wrapper {
    display: flex;
    flex-direction: column;
    .d-about-item {
      padding: 20px;
      .d-title {
        font-size: 24px;
        color: #aaa;
        cursor: pointer;
      }
      .d-content {
        font-size: 16px;
        color: #fff;
        padding: 10px 0;
        text-indent: 20px;
      }
    }
  }
}
</style>
