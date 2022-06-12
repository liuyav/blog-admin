<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { queryArticleList, deleteArticle } from '@/api/article/index';
import { Article, Status, StatusIcon } from '@/api/article/types';
import { formatTime } from '@/utils/index';
import { ElMessage } from 'element-plus';

// 列表数据
const list = ref([]);
// 列表loading
const listLoading = ref(true);
// 查询条件
const searchParams = reactive({
  title: '',
  currentPage: 1,
  pageSize: 16,
  total: 0,
});
// 获取文章列表
const getArticleList = async () => {
  const { data, code } = await queryArticleList(searchParams);
  if (!code) {
    listLoading.value = false;
  }
  list.value = data.list;
  searchParams.total = data.pageInfo.total;
  searchParams.currentPage = data.pageInfo.currentPage;
  searchParams.pageSize = data.pageInfo.pageSize;
  console.log('文章列表：', list.value, searchParams);
};
// 页码改变
const onCurrentChange = (currentPage: number) => {
  searchParams.currentPage = currentPage;
  getArticleList();
};
// 重置查询条件
const onReset = () => {
  console.log('reset');
};

// 点击编辑
const onEdit = (rowData: Article) => {
  console.log('onEdit', rowData);
};

// 点击删除
const onDelete = async (rowData: Article) => {
  const id = rowData._id;
  const { code } = await deleteArticle({ id });
  if (!code) {
    getArticleList();
  }
};
// 点击取消
const onCancel = () => {
  ElMessage({
    message: '取消删除',
    grouping: true,
    type: 'info',
  });
};

onMounted(getArticleList);
</script>

<template>
  <el-card header="文章管理">
    <!-- 文章头部 -->
    <div class="article-header">
      <!-- 按钮 -->
      <div>
        <el-button type="primary" icon="Plus">新增</el-button>
        <el-button icon="unlock">启用</el-button>
        <el-button icon="lock">停用</el-button>
      </div>
      <!-- 查询条件 -->
      <el-form inline :model="searchParams">
        <el-form-item label="文章标题：">
          <el-input
            v-model="searchParams.title"
            placeholder="文章标题模糊查询"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getArticleList">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 文章列表 -->
    <el-table
      v-if="list.length"
      v-loading="listLoading"
      :data="list"
      :border="true"
      highlight-current-row
    >
      <el-table-column type="selection" fixed="left" />
      <el-table-column prop="_id" label="文章 ID" width="160px" fixed="left">
        <template #default="{ row }">
          <el-tooltip effect="light" :content="row._id" placement="left">
            <span>{{ row._id }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" fixed="left">
        <template #default="{ row }">
          <el-tooltip effect="light" :content="row.title" placement="left">
            <span>{{ row.title }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="classify.name" label="分类" />
      <el-table-column prop="classify.tags" label="标签数量">
        <template #default="{ row }">
          <el-tooltip
            effect="light"
            :content="row.classify.tags.join('、')"
            placement="right"
          >
            <el-link>
              <el-icon><CollectionTag /></el-icon>
              <span type="primary" class="spacing-s">{{
                row.classify.tags.length
              }}</span>
            </el-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="liked" label="点赞">
        <template #default="{ row }">
          <div class="v-center">
            <el-icon><Star /></el-icon>
            <span type="primary" class="spacing-s">{{ row.liked }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <div class="v-center">
            <el-icon><component :is="StatusIcon[row.status]" /></el-icon>
            <span class="spacing-s">{{ Status[row.status] }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="createdAt" label="创建时间" min-width="180px">
        <template #default="{ row }">
          <div class="v-center">
            <el-icon><Clock /></el-icon>
            <span class="spacing-s">{{
              formatTime(row.createdAt, 'YYYY-MM-DD HH:mm:ss')
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" min-width="180px">
        <template #default="{ row }">
          <div class="v-center">
            <el-icon><Clock /></el-icon>
            <span class="spacing-s">{{
              formatTime(row.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="140px" fixed="right">
        <template #default="{ row }">
          <div style="display: flex; align-items: center">
            <el-link type="primary" icon="Edit" @click="onEdit(row)">
              <span class="spacing-s">编辑</span>
            </el-link>
            <el-divider direction="vertical" />
            <el-popconfirm
              title="确定删除这条数据吗?"
              @confirm="onDelete(row)"
              @cancel="onCancel"
            >
              <template #reference>
                <el-link type="danger" icon="Delete">
                  <span class="spacing-s">删除</span>
                </el-link>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 暂无数据 -->
    <el-empty v-else />

    <el-pagination
      v-model:currentPage="searchParams.currentPage"
      v-model:pageSize="searchParams.pageSize"
      v-model:total="searchParams.total"
      class="pagination"
      background
      layout="slot, prev, pager, next"
      hide-on-single-page
      @current-change="onCurrentChange"
    >
      <template #default>
        <el-space
          ><span>总计{{ searchParams.total }}条</span></el-space
        >
      </template>
    </el-pagination>
  </el-card>
</template>

<style lang="scss">
@import '@/styles/variables.scss';
.article-header {
  margin-bottom: $contentSpacing;
  display: flex;
  justify-content: space-between;
  height: 32px;
}

.fixTag {
  width: 70px;
  text-align: center;
}
</style>
