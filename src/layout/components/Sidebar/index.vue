<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SidebarItem from './SidebarItem.vue';

const isCollapse = ref(false);

// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };

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
      text-color="#ffffffb3"
      active-text-color="#fff"
      background-color="#001529"
      :unique-opened="false"
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
