import request from '@/utils/request';
import type { ArticleListParams, ArticleList, EnableParams } from './types';
import type { BaseResponse } from '../types';

/**
 * 查询文章列表
 * @param params 文章列表查询参数
 * @returns
 */
export const queryArticleList = async (
  params: ArticleListParams,
): Promise<any> => {
  return await request({
    method: 'get',
    url: '/articles',
    params,
  });
};

/**
 * 查询文章详情
 * @param params
 * @returns
 */
export const queryArticleDetail = async (params: { id: string }) => {
  return await request({
    method: 'get',
    url: `/article/${params.id}`,
  });
};

/**
 * 删除指定文章
 * @param data 文章删除参数
 * @returns
 */
export const deleteArticle = async (data: {
  id: string;
}): Promise<BaseResponse<ArticleList>> => {
  return (await request({
    method: 'delete',
    url: '/article',
    data,
  })) as any;
};

/** 更新停启用状态 */
export const updateEnableStatus = async (data: EnableParams) => {
  return await request({
    method: 'patch',
    url: '/article/updateStatus',
    data,
  });
};

/** 查询文章分类 */
export const queryClassify = async () => {
  return await request({
    method: 'get',
    url: '/classify',
  });
};
