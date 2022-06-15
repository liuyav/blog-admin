<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SidebarItem from './SidebarItem.vue';

const isCollapse = computed(() => useAppStore().sidebar);

const routes = computed(() => useRouter().options.routes);

/** 默认选中路由 */
const defaultActive = computed(() => {
  const { meta, path } = useRoute();
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<template>
  <el-scrollbar class="scrollbar-wrapper">
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      text-color="#ffffffb3"
      active-text-color="#fff"
      background-color="#001529"
      :unique-opened="true"
      mode="vertical"
    >
      <SidebarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>
<style lang="scss" scoped>
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
</style>
