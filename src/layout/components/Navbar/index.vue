<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();

const toggleSidebar = () => {
  appStore.sidebar = !appStore.sidebar;
};
</script>

<template>
  <div class="navBar">
    <el-icon @click="toggleSidebar"><Fold /></el-icon>
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>

<style lang="scss" scoped></style>
