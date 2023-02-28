<template>
  <div class="d-add-page">
    <div>标题</div>
    <div>
      <input
        v-model="titleValue"
        type="text"
        style="width: 100%; height: 32px"
      />
    </div>
    <div>图片</div>
    <div>
      <input type="button" value="点击上传" @click="addImg" />
    </div>
    <div>
      <img :src="base64" alt="" style="max-width: 100%" />
    </div>
    <div>文件</div>
    <div>
      <input type="button" value="点击上传" @click="addText" />
    </div>
    <div>
      {{ mdValue }}
    </div>
    <input type="button" value="发布" @click="addMd" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { HomeService } from "@/assets/api/api";
import { dataList } from "./arr.js";

onMounted(async () => {});

const titleValue = ref("");
/** 图片 */
const base64: any = ref("");
const addImg = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/png, image/jpeg";
  input.addEventListener("change", (source: any) => changeImgUrl(source));
  input.click();
};
const changeImgUrl = (source: any) => {
  if (source) {
    let input = source;
    let reader = new FileReader();
    reader.readAsDataURL(input.target.files[0]);
    reader.addEventListener("load", () => {
      if (reader.result) {
        base64.value = reader.result;
      }
    });
  }
};

/** md 文件 */
const mdValue: any = ref("");
const addText = () => {
  const input = document.createElement("input");
  input.type = "file";
  //   input.accept = "image/png, image/jpeg";
  input.addEventListener("change", (source: any) => changeText(source));
  input.click();
};
const changeText = (source: any) => {
  if (source) {
    let input = source;
    let reader = new FileReader();
    reader.readAsText(input.target.files[0]);
    reader.addEventListener("load", () => {
      if (reader.result) {
        mdValue.value = reader.result;
      }
    });
  }
};

const addMd = () => {
  HomeService.addMd({
    img: base64.value,
    text: mdValue.value,
    title: titleValue.value,
  }).then((res) => {
    console.log(res);
  });
};
</script>

<style scoped lang="less">
.d-add-page {
  padding: 1rem;
  color: #fff;
}
</style>
