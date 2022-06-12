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

export type ArticleList = Article[];
