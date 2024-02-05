export const flattenTree = <T>(tree: T[], childName = 'children'): T[] => {
  const result: T[] = [];
  tree.forEach((item: any) => {
    result.push(item);
    if (item[childName]) {
      result.push(...flattenTree<T>(item[childName], childName));
    }
  });
  return result;
};

export const findFirstObj = <T, K extends keyof T>(
  tree: T[],
  childName: K,
  filterParam: keyof T
): T | undefined => {
  for (const item of tree) {
    if (item[filterParam] !== undefined) return item;
    if (item[childName] as T[]) {
      const nestedItem = findFirstObj(
        item[childName] as T[],
        childName,
        filterParam
      );
      if (nestedItem) return nestedItem;
    }
  }
  return undefined;
};
