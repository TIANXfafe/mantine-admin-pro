export const isEmail = (str: string) => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
};

export const isPhone = (str: string) => {
  const reg = /^1\d{10}$/;
  return reg.test(str);
};
