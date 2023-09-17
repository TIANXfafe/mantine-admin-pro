import { useMediaQuery } from '@mantine/hooks';

export const useQueryBreakpoints = () => {
  // PC
  const isDesktop = useMediaQuery('(min-width: 75em)');
  // 平板
  const isPad = useMediaQuery('(min-width: 48em) and (max-width: 75em)');
  // 移动端
  const isMobile = useMediaQuery('(max-width: 48em)');
  return {
    isMobile,
    isPad,
    isDesktop
  };
};
