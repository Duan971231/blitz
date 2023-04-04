<template>
  <div class="d-index-page">
    <div class="d-img-block">
      <img src="@/assets/images/indexImg.jpg" alt="" />
      <div class="d-img-mark">
        <div class="d-title-one">宁静得等待美好</div>
        <div class="d-title-two">过去不能改变，但是未来可以</div>
      </div>
    </div>
    <div class="d-good-choice">
      <div class="d-choice-header">首页推荐</div>
      <div class="d-choice-wrapper">
        <div class="d-choice-item" v-for="item in list">
          <div class="d-img-block">
            <img :src="item.img" alt="" />
          </div>
          <div class="d-item-title">{{ item.title }}{{ item.title }}</div>
          <div class="d-item-bottom">
            <div class="d-item-time">
              {{ dayjs(item.time).format('YYYY-MM-DD') }}
            </div>
            <div class="d-item-see">
              <div class="d-star">
                <div class="d-star-conent">
                  <span class="iconfont icon-QQ"></span>
                  <span class="number">{{ item.star }}</span>
                </div>
              </div>
              <div class="d-star">
                <div class="d-star-conent">
                  <span class="iconfont icon-QQ"></span>
                  <span class="number">{{ item.see }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { HomeService } from '@/assets/api/api';
import { onMounted, reactive } from 'vue';

const list: any = reactive([]);

onMounted(async () => {
  let res: any = await HomeService.getAllMd();
  if (res && res.data) {
    list.push(...res.data);
  }
});
</script>
<style lang="less" scoped>
.d-index-page {
  color: #fff;
  padding: 1rem;
  .d-img-block {
    width: 100%;
    overflow: hidden;
    position: relative;
    margin-bottom: 10px;
    img {
      width: 100%;
    }
    .d-img-mark {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(57, 65, 72, 0.7);
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #ddd;
      word-break: break-all;
    }
    .d-title-one {
      margin-bottom: 10px;
    }
  }
  .d-good-choice {
    .d-choice-header {
      font-size: 28px;
      height: 50px;
      position: relative;
      line-height: 50px;
      padding-left: 1rem;
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 0.7);
      &::before {
        display: inline-block;
        content: '';
        width: 5px;
        height: 30px;
        background-color: rgba(202, 205, 208, 0.7);
        position: absolute;
        top: 10px;
        left: 0px;
      }
    }
    .d-choice-wrapper {
      display: flex;
      flex-wrap: wrap;
      .d-choice-item {
        width: 260px;
        height: 280px;
        background-color: rgba(255, 255, 255, 0.08);
        margin-bottom: 10px;
        border-radius: 5px;
        .d-img-block {
          width: 240px;
          height: 180px;
          overflow: hidden;
          margin: 10px;
          position: relative;
          border-radius: 5px;
          img {
            position: absolute;
            width: 240px;
            height: 180px;
            transition: all 0.5s;
            top: 0;
            left: 0;
            &:hover {
              width: 260px;
              height: 200px;
              top: -10px;
              left: -10px;
            }
          }
        }
        .d-item-title {
          color: #fff;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-weight: bold;
          padding-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            color: #aaa;
          }
        }
        .d-item-bottom {
          height: 30px;
          line-height: 30px;
          display: flex;
          .d-item-time {
            flex: 1;
            padding-left: 10px;
            color: #fff;
            font-size: 14px;
          }
          .d-item-see {
            flex: 1;
            display: flex;
            .d-star {
              flex: 1;
              display: flex;
              justify-content: right;
              padding-right: 10px;
              .d-star-conent {
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                .number {
                  margin-left: 5px;
                }
                &:hover {
                  color: #aaa;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1200px) {
  .d-title-one {
    height: 40px;
    font-size: 30px;
    line-height: 40px;
  }
  .d-title-two {
    height: 50px;
    font-size: 40px;
    line-height: 50px;
  }
  .d-choice-wrapper {
    justify-content: space-between;
  }
}

@media (max-width: 1199px) {
  .d-title-one {
    height: 20px;
    font-size: 15px;
    line-height: 20px;
  }
  .d-title-two {
    height: 25px;
    font-size: 20px;
    line-height: 25px;
  }
  .d-choice-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
