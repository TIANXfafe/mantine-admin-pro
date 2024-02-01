import { Group, Button } from '@mantine/core';
import SelectLang from '@/layout/SelectLang';

const RightContent = () => {
  return (
    <Group spacing="md">
      <SelectLang />
      <Button>123</Button>
      <Button>456</Button>
    </Group>
  );
};

export default RightContent;
