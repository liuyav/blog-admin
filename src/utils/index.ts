import moment from 'moment';

/**
 * 时间格式化方法
 * @param time 需要格式化的时间
 * @param format 格式 eg: YYYY-MM-DD HH:mm:ss
 * @returns String eg: xxxx-xx-xx
 */
export const formatTime = (time: Date, format: string) => {
  return moment(time).format(format);
};
