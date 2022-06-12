<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import SidebarItem from './SidebarItem.vue';

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const routes = computed(() => useRouter().options.routes);

const defaultActive = computed(() => useRouter().currentRoute.value.path);
console.log('routes', useRouter());
console.log('routes', useRouter().currentRoute.value.path);
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
      @open="handleOpen"
      @close="handleClose"
    >
      <SidebarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>
