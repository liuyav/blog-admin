<template>
  <div v-if="!item.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <router-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(basePath, onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(basePath, onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <span>{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(basePath, item.path)"
      popper-append-to-body
    >
      <template #title>
        <div>
          <el-icon
            ><component :is="item.meta && item.meta.icon"></component
          ></el-icon>
          <span>{{ item.meta.title }}</span>
        </div>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        class="nest-menu"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(basePath, child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts" name="SidebarItem">
import { Ref, ref, toRefs } from 'vue';
import { resolvePath } from '@/utils/index';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
});

const onlyOneChild: Ref<any> = ref(null);

const { basePath } = toRefs(props);

const hasOneShowingChild = (children = [], parent: any) => {
  // 过滤掉隐藏子路由，并且把最后一个路由赋值给 onlyOneChild 变量
  const showingChildren = children.filter((item: any) => {
    if (item.meta.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // 判断子路由数量是否等于1
  if (showingChildren.length === 1) {
    return true;
  }

  // 子路由数量等于0，就把自己路由赋值给
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  return false;
};
</script>
