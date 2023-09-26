export const flattenTree = (tree: any, childName = 'children') => {
  const result: any = [];
  tree.forEach((item: any) => {
    result.push(item);
    if (item[childName]) {
      result.push(...flattenTree(item[childName], childName));
    }
  });

  return result;
};
