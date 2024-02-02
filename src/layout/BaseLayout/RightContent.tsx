import { Group } from '@mantine/core';
import Notify from '../Notify';
import SelectLang from '@/layout/SelectLang';
import SelectUser from '../SelectUser';

const RightContent = () => {
  return (
    <Group spacing="lg">
      <Notify />
      <SelectLang />
      <SelectUser />
    </Group>
  );
};

export default RightContent;
