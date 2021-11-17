<template>
    <div id="top">
      <div class="top_center">
        <div class="logo">Blitz的个人博客</div>
        <div class="list">
          <ul>
            <li v-for="(i, k) in lis" :key="k"
              @click="changePath(i.router)">{{i.name}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script lang = "ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class Top extends Vue{
  public lis:{name:string, router:string}[] = [
    {
      name: '博客首页',
      router: '/'
    }, {
      name: '技术分享',
      router: '/share'
    }, {
      name: '程序人生',
      router: '/program'
    }, {
      name: '博客推荐',
      router: '/'
    }, {
      name: '关于我',
      router: '/aboutMe'
    }, {
      name: '留言',
      router: '/'
    }, {
      name: '个人博客模板',
      router: '/'
    }
  ]
    
  public changePath(path:string):void {
    this.$router.push(path);
  }
}
</script>

<style scoped lang="scss">
@media (min-width: 0px) {
  #top {
    position: fixed;
    width: 100%;
    background-color: #1C2327;
    height: 60px;
    top: 0;
    &::before {
      display: block;
      content: '';
      height: 5px;
      background-image: linear-gradient(to right, #ff2d55, #5856d6, #34aadc, #007aff, #5ac8fa, #4cd964); 
    }
    .top_center {
      position: relative;
      width: 100%;
      height: 55px;
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .logo {
        position: absolute;
        line-height: 55px;
        left: 10px;
        color: #D2D4D5;
        cursor: pointer;
        font: {
          family: '宋体';
          size: 24px;
        }
      }
      .list {
        position: absolute;
        right: 0;
        height: 55px;
        ul {
          margin: 0;
          padding: 0;
          height: 100%;
          padding-right: 20px;
          li {
            display: inline-block;
            height: 55px;
            font-size: 16px;
            line-height: 55px;
            margin-left: 30px;
            list-style: none;
            color: #FFF;
            cursor: pointer;
            &:hover {
              color: #66CDAA;
            }
            &:not(:first-child) {
              &::after {
                color: #ADAFB0;
                content: ">";
                display: inline-block;
                width: 16px;
                height: 16px;
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width: 576px) {
  #index_top {
    
  }
}
@media (min-width: 768px) {
  #index_top {

  }
}
@media  (min-width: 992px) {
  #index_top {
    
  }
}
</style>
