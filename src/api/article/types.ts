/** 文章列表查询参数 */
export interface ArticleListParams {
  classify?: string;
  tags?: string;
  currentPage: number;
  pageSize: number;
  total: number;
}

/** 状态 */
export enum Status {
  草稿,
  启用,
  停用,
}

/** 状态图标 */
export enum StatusIcon {
  EditPen,
  Unlock,
  Lock,
}

/** 文章类型 */
export enum ArticleType {
  add = '创建',
  edit = '编辑',
  view = '查看',
}

/** 文章详情 */
export interface Article {
  _id: string;
  /** 标题 */
  title: string;
  author: string;
  classify: string;
  tags: Array<string>;
  liked: number;
  createAt: Date;
  updatedAt: Date;
  status: Status;
}

/** 文章列表 */
export type ArticleList = Article[];

/** 更改启用状态参数 */
export interface EnableParams {
  /** 文章id */
  id: string;
  /** 状态 */
  status: Status;
}
