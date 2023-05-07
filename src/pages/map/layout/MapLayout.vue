<template>
  <Layout class="base-layout" :style="{ height: '100vh' }">
    <Layout.Header class="layout-header">
      <div class="layout-header-logo">
        <span class="iconfont icon-stepback" @click="back"></span>
        <!-- <h1>返回</h1> -->
      </div>
      <div class="header-content">
        <Menu class="menu" mode="horizontal" v-model:selectedKeys="selectKeys" v-model:openKeys="openKeys">
          <template v-for="item in menuData">
            <Menu.SubMenu
              v-if="item.children && item.children.length > 0"
              v-on:title-click="changeOpenKeys(item.key)"
              :key="item.key"
            >
              <template #title>
                {{ item.name }}
              </template>
              <Menu.Item
                v-for="child in item.children"
                :key="child.key"
                v-on:click="changeSelectKeys(child.key, child.path)"
              >
                <span>{{ child.name }}</span>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item v-else :key="'' + item.key" v-on:click="changeSelectKeys(item.key, item.path)">
              <span>{{ item.name }}</span>
            </Menu.Item>
          </template>
        </Menu>
      </div>

      <Dropdown>
        <div class="layout-header-action">
          <Space>
            <Avatar :style="{ color: '#fff' }" size="small">
              <template #icon>
                <span class="iconfont icon-user" style="margin-top: -5px; font-size: 24px"></span>
              </template>
            </Avatar>
            <!-- <span>{{ userInfo.userName || userInfo.name }}</span> -->
          </Space>
        </div>
        <!-- <template #overlay>
          <Menu :style="{ width: '160px' }">
            <Menu.Item>
              <IconFont type="icon-QQ" />
              个人信息
            </Menu.Item>
            <Menu.Item>
              <IconFont type="icon-setting" />
              系统设置
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item @click="onSignout">
              <IconFont type="icon-log-out" />
              退出登录
            </Menu.Item>
          </Menu>
        </template> -->
      </Dropdown>
    </Layout.Header>
    <Layout>
      <Layout.Content>
        <!-- 防止页面刷新，table自适应高度塌陷 -->
        <div style="height: 40px">
          <Breadcrumb @setSelectKey="selectKeys = []" />
        </div>
        <div class="layout-router-view">
          <RouterView class="layout-wrapper" />
        </div>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { Avatar, Dropdown, Layout, Menu, Space } from 'ant-design-vue';
import { onBeforeMount, ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.vue';

// import * as API_USER from '@/common/api/user.api';
// import * as UTILS_DATA from '@/utils/data';
import menuData from './base-menu';

const selectKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);
const router = useRouter();
const route = useRoute();

const back = () => {
  router.back();
};

const changeOpenKeys = (routeKey: string | undefined | null): void => {
  const currentOpenKeys = [...openKeys.value];
  if (routeKey) {
    if (currentOpenKeys.includes(routeKey)) {
      currentOpenKeys.splice(currentOpenKeys.indexOf(routeKey), 1);
    } else {
      currentOpenKeys.push(routeKey);
    }
    openKeys.value = currentOpenKeys;
  }
};

const changeSelectKeys = (routeKey: string | undefined, path?: string): void => {
  if (routeKey) {
    if (routeKey !== selectKeys.value[0]) {
      selectKeys.value = [routeKey];
    }

    if (path) {
      router.push(path);
    }
  }
};

const getDefaultSelectAndOpenKeys = (): void => {
  let defaultSelectKeys: string[] = [];
  // const defaultOpenKeys: string[] = [];
  const routeMatched = [...route.matched];
  if (routeMatched.length > 0) {
    const currentSelectKey: string = routeMatched.pop()?.name as string;
    if (currentSelectKey) {
      defaultSelectKeys = [currentSelectKey];
    }
    // if (routeMatched.length > 0) {
    //   defaultOpenKeys = routeMatched.map((routeMatchedItem) => {
    //     return routeMatchedItem?.name as string;
    //   });
    // }
    selectKeys.value = defaultSelectKeys;
    // openKeys.value = defaultOpenKeys;
  }
};

// const onSignout = () => {
//   if (userInfo.userId) {
//     // API_USER.UserService.signOut(userInfo.userId);
//     window.localStorage.removeItem('user');
//     window.localStorage.removeItem('token');
//     location.href = import.meta.env.VITE_SIGN_PATH + '?redirect=' + encodeURIComponent(location.origin);
//   }
// };

onBeforeMount(() => {
  getDefaultSelectAndOpenKeys();
});
</script>

<style scoped lang="less">
@import '@/styles/layout.less';
</style>
