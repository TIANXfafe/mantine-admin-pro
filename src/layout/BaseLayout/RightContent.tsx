import { Group } from '@mantine/core';
import Notify from '@/layout/Notify';
import SelectLang from '@/layout/SelectLang';
import SelectUser from '@/layout/SelectUser';
import SelectStyle from '@/layout/SelectStyle';

const RightContent = () => {
  return (
    <Group spacing="lg">
      <Notify />
      <SelectLang />
      <SelectStyle />
      <SelectUser />
    </Group>
  );
};

export default RightContent;
