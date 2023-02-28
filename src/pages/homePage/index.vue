<template>
  <div class="d-home-page" ref="homePageRef">
    <div class="d-home-header">
      <div class="d-header-content">
        <span class="d-header-name">【德武庵】</span>
        <div class="d-header-icons">
          <HeaderButton
            class="d-header-icon"
            v-for="item in list"
            :key="item.value"
            @click="changRouter(item.router)"
            >{{ item.label }}</HeaderButton
          >
        </div>
      </div>
    </div>
    <div class="d-home-wrapper">
      <div class="d-wrapper d-overflow-y">
        <div class="d-wrapper-content">
          <RouterView class="homeRouter" />
          <div class="d-home-bottom">
            <div class="d-bottom-top">
              <div class="d-bottom-img">
                <img src="@/assets/images/logo.png" alt="" />
              </div>
              <div class="d-connection">
                <div v-for="item in bottomList" class="d-connection-item">
                  <span class="iconfont" :class="item.icon"></span>
                  <span class="d-item-bottom">{{ item.lable }}</span>
                </div>
              </div>
            </div>
            <div class="d-bottom-bottom">
              <div class="d-github" @click="toGithub">GITHUB</div>
              <div class="d-pic">Powered by Dhs | 暂无备案号</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { marked } from "marked";
import { RouterView } from "vue-router";
import HeaderButton from "@/components/HeaderButton/index.vue";
import testMd from "../../mds/test.md?raw";
import { useRouter } from "vue-router";

const code = ref("");
const homePageRef = ref();
code.value = marked(testMd);

const router = useRouter();

const showType = ref("big"); // small or big
/** 判定屏幕是大屏还是小屏 */
const setType = () => {
  const { width } = homePageRef.value.getBoundingClientRect();
  if (width >= 1200) {
    showType.value = "big";
  } else {
    showType.value = "small";
  }
};

/**顶部导航栏列表 */
const list = reactive([
  {
    label: "首页",
    value: "index",
    router: "/index",
  },
  {
    label: "关于本站",
    value: "about",
    router: "/about",
  },
  {
    label: "新增",
    value: "add",
    router: "/add",
  },
  {
    label: "大事记",
    value: "book",
    router: "/book",
  },
  {
    label: "我的",
    value: "me",
    router: "/me",
  },
]);

/** 底部联系方式列表 */
const bottomList = reactive([
  {
    icon: "icon-phone-fill",
    lable: "18512326932",
  },
  {
    icon: "icon-youxiang-",
    lable: "1530904047@qq.com",
  },
  {
    icon: "icon-QQ",
    lable: "1530904047",
  },
]);

onMounted(() => {
  setType();
  window.addEventListener("resize", () => {
    setType();
  });
});

const changRouter = (route: string) => {
  router.push(route);
};

/** 跳转 github  */
const toGithub = () => {
  window.open("https://gitee.com/duanhansong122/vite-vue");
};
</script>
<style lang="less" scoped>
.d-home-page {
  width: 100%;
  height: 100%;
  .d-home-header {
    background-color: #3f4657;
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
    background-color: #394148;
    .d-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
    }
    .d-wrapper-content {
      max-width: 1200px;
      width: 100%;
      .homeRouter {
        min-height: calc(100% - 300px);
      }
    }
    .d-home-bottom {
      width: 100%;
      height: 300px;
      .d-bottom-top {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        .d-bottom-img {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 300px;
          }
        }
        .d-connection {
          display: flex;
          justify-content: center;
          align-items: center;
          .d-connection-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #a7afae;
            .iconfont {
              font-size: 24px;
            }
            .d-item-bottom {
              padding: 10px 0;
              display: inline-block;

              margin-top: 1rem;
              text-align: center;
              border-top: 1px solid rgba(255, 255, 255, 0.08);
            }
          }
        }
      }
      .d-bottom-bottom {
        min-height: 80px;
        display: flex;
        color: #a7afae;
        .d-github {
          font-weight: bold;
          cursor: pointer;
          &:hover {
            color: #5d5f5f;
          }
        }
      }
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
        .d-header-icon + .d-header-icon {
          margin-left: 1rem;
        }
      }
    }
  }
  .d-home-wrapper {
    height: calc(100% - 60px);
  }
  .d-home-bottom {
    .d-bottom-top {
      .d-bottom-img {
        min-height: 180px;
        flex: 2;
        border-right: 1px solid rgba(255, 255, 255, 0.08);
      }
      .d-connection {
        flex: 3;
        justify-content: center;
        align-items: center;
        .d-item-bottom {
          width: calc(100% - 4rem);
        }
      }
    }
    .d-bottom-bottom {
      justify-content: space-between;
      align-items: center;
    }
  }
}
@media (max-width: 1199px) {
  .d-home-header {
    height: 80px;
  }
  .d-home-wrapper {
    height: calc(100% - 80px);
  }
  .d-home-bottom {
    .d-bottom-top {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      flex-direction: column;
      .d-bottom-img {
        min-height: 140px;
      }
      .d-connection {
        padding-bottom: 2rem;
        display: flex;
        flex-direction: column;
        .d-connection-item {
          width: 100%;
          min-height: 120px;
          .d-item-bottom {
            width: calc(100% - 8rem);
          }
        }
      }
    }
    .d-bottom-bottom {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .d-github,
      .d-pic {
        height: 60px;
        line-height: 60px;
      }
    }
  }
}
</style>
