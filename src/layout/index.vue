<template>
  <el-container>
    <!-- 侧边菜单 -->
    <Sidebar class="sidebar-container" />
    <!-- 内容区 -->
    <AppMain />
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from '@/layout/components/Sidebar/index.vue';
import AppMain from '@/layout/components/AppMain.vue';
</script>
