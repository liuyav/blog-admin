import moment from 'moment';
import path from 'path-browserify';

/**
 * 时间格式化方法
 * @param time 需要格式化的时间
 * @param format 格式 eg: YYYY-MM-DD HH:mm:ss
 * @returns String eg: xxxx-xx-xx
 */
export const formatTime = (time: Date, format: string) => {
  return moment(time).format(format);
};

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 拼接路由路径
 * @param basePath
 * @param routePath
 * @returns
 */
export function resolveRoutePath(basePath: string, routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(basePath)) {
    return basePath;
  }
  return basePath ? path.resolve(basePath, routePath) : routePath;
}
