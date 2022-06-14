<template>
  <el-card :header="`${typeName}文章`">
    <el-row>
      <!-- 文章 -->
      <el-col :span="20">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="140px"
          label-position="right"
          size="default"
          status-icon
        >
          <el-divider content-position="left" class="title">
            <h3>文章基本信息</h3>
          </el-divider>
          <el-form-item label="文章标题：" prop="title" class="cpt">
            <el-input
              v-model="ruleForm.title"
              placeholder="请输入5-30字之间的文章标题"
            />
          </el-form-item>
          <el-form-item label="文章分类：" prop="classify">
            <el-tree-select
              v-model="ruleForm.classify"
              placeholder="请选择文章分类"
              :data="classifyOption"
              :prop="{ label: 'label', children: 'children' }"
              node-key="_id"
            />
          </el-form-item>
          <el-form-item label="文章标签：" prop="tags">
            <el-input
              v-model="ruleForm.tags"
              placeholder="请选择文章所属标签"
            />
          </el-form-item>
          <el-form-item label="文章描述：" prop="description">
            <el-input
              v-model="ruleForm.description"
              placeholder="文章的简短介绍"
            />
          </el-form-item>
          <el-form-item label="上传封面：" prop="description" class="cpb">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-form-item>
          <el-divider content-position="left" class="title">
            <h3>文章参数配置</h3>
          </el-divider>
          <el-form-item label="保存设置：" prop="delivery" class="cpt">
            <el-radio-group v-model="ruleForm.status">
              <el-radio border label="保存为草稿" />
              <el-radio border label="立即发布" />
              <el-radio border label="定时发布" />
              <el-radio border label="停用" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="定时发布时间：">
            <el-date-picker
              type="datetime"
              :shortcuts="shortcuts"
              placeholder="请选择自动发布时间"
            />
          </el-form-item>
          <el-form-item label="文章权限：" class="cpb">
            <el-checkbox-group>
              <el-checkbox label="点赞" />
              <el-checkbox label="评论" />
              <el-checkbox label="收藏" />
              <el-checkbox label="转发" />
              <el-checkbox label="打赏" />
              <el-checkbox label="复制" />
            </el-checkbox-group>
          </el-form-item>
          <el-divider content-position="left" class="title">
            <h3>文章内容编辑</h3>
          </el-divider>
          <el-form-item label="文章内容：" prop="content" class="cpt">
            <div id="vditor" class="editor"></div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              保存
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { onMounted, reactive, ref, Ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRoute } from 'vue-router';
import { ArticleType } from '@/api/article/types';
import { queryArticleDetail, queryClassify } from '@/api/article';
import { Plus } from '@element-plus/icons-vue';

import type { UploadProps } from 'element-plus';

const type: string = useRoute().params.type as string;
const typeName: Ref<any> = ref((ArticleType as any)[type]);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  /** 文章标题 */
  title: '',
  /** 文章作者 */
  author: '',
  /** 文章分类 */
  classify: '',
  /** 文章标签 */
  tags: [],
  /** 文章描述 */
  description: '',
  /** 文章内容 */
  content: '',
  /** 文章状态 */
  status: 0,
  /** 文章海报 */
  poster: '',
});

const rules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 5, max: 30, message: '标题长度限制在5到30个之间', trigger: 'blur' },
  ],
  author: [
    {
      required: true,
      message: '请输入作者名称',
      trigger: 'blur',
    },
  ],
  classify: [
    {
      required: true,
      message: '请选择文章分类',
      trigger: 'change',
    },
  ],
  tags: [{ required: true, message: '请选择文章标签', trigger: 'change' }],
  content: [
    {
      required: true,
      message: '文章内容不能为空',
      trigger: 'blur',
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

/** 查询文章详情 */
const queryDetail = async () => {
  const id: string = useRoute().params.id as string;
  const res = await queryArticleDetail({ id });
  console.log('res', res);
};

/** 分类数据 */
const classifyOption = ref({});
/** 查询分类 */
const queryClassifyOption = async () => {
  const { data } = await queryClassify();
  classifyOption.value = data;
};

const vditor = ref<Vditor | null>(null);

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];
onMounted(() => {
  type !== 'add' && queryDetail();
  queryClassifyOption();
  vditor.value = new Vditor('vditor', {
    after: () => {
      // vditor.value is a instance of Vditor now and thus can be safely used here
      vditor.value?.setValue('尽情开始你的创作吧！~');
    },
  });
});
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.detail {
  display: flex;
}

// 进度条设置
.steps {
  // 进度条高度
  .el-steps {
    height: 600px;
    padding: $contentSpacing 0 0 $contentSpacing;
  }
}

// 重置分隔线里面h3间距
.el-divider__text {
  & h3 {
    margin: 0;
  }
}

.editor {
  width: 100% !important;
  z-index: 1001 !important;

  :deep(.vditor-toolbar) {
    padding: 0 $contentSpacing !important;
  }

  :deep(.vditor-reset) {
    padding: $contentSpacing !important;
  }
}

.el-card__body {
  padding-top: 0 !important;
}
</style>
