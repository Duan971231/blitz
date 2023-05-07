<template>
  <div class="map-tool-box">
    <div class="tools" :style="{ marginLeft: `${toolsWidth}px` }">
      <div class="tool-item" @click="toolItemClick('capture')">截屏</div>
      <div class="tool-item" @click="printDocx">打印word</div>
    </div>
    <div class="icon" @click="changeShowBox">
      <a-space>
        <double-left-outlined v-if="!showBox" />
        <double-right-outlined v-if="showBox" />
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import { ref, watch } from 'vue';
const emit = defineEmits(['toolChange']);
const showBox = ref(false);
const toolsWidth = ref(-38);

watch(
  () => showBox.value,
  (newValue) => {
    console.log('newValue');
    toolsWidth.value = newValue ? 0 : -38;
    console.log(toolsWidth.value);
  },
);
const changeShowBox = () => {
  showBox.value = !showBox.value;
};
const toolItemClick = (type: string) => {
  emit('toolChange', type);
};

const printDocx = () => {
  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      table {
        width: 100%;
        table-layout: fixed;
        border-top: 1px solid #000;
        border-right: 1px solid #000;
      }
      td {
        text-align: center;
        border-left: 1px solid #000;
        border-bottom: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <table class="page-table" cellspacing="0" cellpadding="0" style="width: 100%">
      <tr>
        <td style="width: 20%">记录日期</td>
        <td colspan="2">
          <div class="t-right">
            <span> year </span>
            年
            <span class="t-right-span"> month </span>
            月
            <span class="t-right-span"> date </span>
            日
          </div>
        </td>
      </tr>
      <tr>
        <td>记录单位</td>
        <td colspan="2">
           recordCompany 
          <div class="t-right">
            值班员:
            <span> recordMember </span>
          </div>
        </td>
      </tr>
      <tr>
        <td>报告单位</td>
        <td colspan="2">
           reportCompany 
        </td>
      </tr>
      <tr>
        <td>报告时间</td>
        <td colspan="2">
           reportDateTable 
        </td>
      </tr>
      <tr>
        <td>航班号</td>
        <td colspan="2">
           flightNo 
        </td>
      </tr>
      <tr>
        <td>机型/机号</td>
        <td colspan="2">
           airplaneNo 
        </td>
      </tr>
      <tr>
        <td>详细内容（出现的日期、时间、位置、高度、飞机异常情况等）</td>
        <td colspan="2">
           detail 
        </td>
      </tr>
      <tr>
        <td rowspan="3">报告传递记录</td>
        <td>
          <div class="t-left">
            <span class="underline"> backspace </span>
            气象监视台
          </div>
          <div class="tax-phone">
            （传真电话:
            <span> backspace </span>
            ）
          </div>
        </td>
        <td>
          <div class="tax-time">传真时间:</div>
          <div class="tax-time">接收人:</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="t-left">
            <span class="underline"> backspace </span>
            地区气象中心
          </div>
          <div class="tax-phone">
            （传真电话:
            <span> backspace </span>
            ）
          </div>
        </td>
        <td>
          <div class="tax-time">传真时间:</div>
          <div class="tax-time">接收人:</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="t-left">
            <span class="underline"> backspace </span>
            民航气象中心
          </div>
          <div class="tax-phone">
            （传真电话:
            <span> backspace </span>
            ）
          </div>
        </td>
        <td>
          <div class="tax-time">传真时间:</div>
          <div class="tax-time">接收人:</div>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
  asBlob(html)
    .then((blob: any) => {
      const blobData = new Blob([blob]);
      saveAs(blobData, 'test.docx');
      return;
    })
    .catch((error: any) => {
      console.log(error);
    });
};
</script>
<style lang="less" scoped>
.map-tool-box {
  background-color: rgb(27, 26, 83);
  cursor: pointer;
  color: #fff;
  display: flex;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  .tools {
    display: flex;
    transition: all 0.5s;
    overflow: hidden;
    .tool-item {
      padding: 0 5px;
      &:hover {
        color: rgb(189, 189, 189);
      }
    }
  }
  .icon {
    height: 40px;
    width: 40px;
  }
}
</style>
