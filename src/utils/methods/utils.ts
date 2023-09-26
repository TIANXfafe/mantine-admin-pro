// ** 对象是否为空 (returns boolean)
export const isObjEmpty = (obj: { [key: string]: any }) =>
  Object.keys(obj).length === 0;
