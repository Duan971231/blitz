<template>
  <div class="confirm-dialog">
    <div class="dialog-wrapper">
      <div class="confirm-header">
        <div class="title">{{ props.title }}</div>
        <span class="iconfont icon-close" @click="close"></span>
      </div>
      <div class="confirm-content">
        <div class="content-label">{{ content }}</div>
        <div v-if="code" class="content-label">
          <span>{{ `如果确定，请输入【${codeNumber}】：` }}</span>
          <a-input style="width: 70px"></a-input>
        </div>
      </div>
      <div class="confitm-btns">
        <a-button @click="close">取消</a-button>
        <a-button type="primary" @click="confirm">确定</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = withDefaults(
  defineProps<{
    title?: string;
    content?: string;
    code?: boolean;
  }>(),
  {
    title: '系统提示',
    content: '确定要删除么？',
    code: false,
  },
);
const emits = defineEmits(['close', 'confirm']);
const codeNumber = ref(0);

const close = () => {
  emits('close');
};
const confirm = () => {
  emits('confirm');
};
</script>
<style lang="less" scoped>
.confirm-dialog {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  .dialog-wrapper {
    background-color: #fff;
    min-width: 400px;
    max-width: 400px;
    min-height: 200px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.08), 3px -3px 3px 3px rgba(0, 0, 0, 0.08),
      -3px 3px 3px 3px rgba(0, 0, 0, 0.08), -3px -3px 3px 3px rgba(0, 0, 0, 0.08);
    .confirm-header {
      display: flex;
      justify-content: space-between;
      height: 30px;
      align-items: center;
      font-size: 18px;
      .title {
        font-weight: bold;
      }
      .iconfont {
        font-size: 20px;
      }
    }
    .confirm-content {
      flex: 1;
      padding: 20px 0;
      .content-label {
        text-indent: 20px;
        line-height: 35px;
      }
    }
    .confitm-btns {
      height: 40px;
      line-height: 40px;
      text-align: right;
      button {
        margin-left: 15px;
      }
    }
  }
}
</style>
