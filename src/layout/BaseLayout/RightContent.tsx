import { Group, Button } from '@mantine/core';
import SelectLang from '@/layout/SelectLang';
import SelectUser from '../SelectUser';

const RightContent = () => {
  return (
    <Group spacing="md">
      <SelectLang />
      <Button>123</Button>
      <SelectUser />
    </Group>
  );
};

export default RightContent;
