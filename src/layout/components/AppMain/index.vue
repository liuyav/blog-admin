<script setup lang="ts">
import NavBar from '@/layout/components/Navbar/index.vue';
</script>

<template>
  <div class="main-container">
    <div class="header-container">
      <NavBar />
    </div>
    <RouterView class="content-container" />
  </div>
</template>
