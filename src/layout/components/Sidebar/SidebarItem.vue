<template>
  <el-sub-menu v-if="hasDownMenu" :index="path">
    <template #title>
      <el-icon><component :is="item.meta.icon" /></el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <el-menu-item
      v-for="childItem in item.children"
      :key="childItem.path"
      :index="childItem.path"
    >
      <template #title>
        <router-link :to="childItem.path">
          {{ childItem.meta.title }}
        </router-link>
      </template>
    </el-menu-item>
  </el-sub-menu>
  <el-menu-item v-else :index="path">
    <template #title>
      <el-icon><component :is="item.children[0].meta.icon" /></el-icon>
      <router-link :to="item.path">
        {{ item.children[0].meta.title }}
      </router-link>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  path: {
    type: String,
    default: '',
  },
});

const hasDownMenu = computed(() => {
  return props.item.children.length > 1;
});
</script>

<style></style>
