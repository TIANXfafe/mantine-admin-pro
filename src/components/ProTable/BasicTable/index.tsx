import {
  Flex,
  Button,
  Popover,
  ActionIcon,
  Paper,
  Space,
  Title,
  Table,
  Pagination
} from '@mantine/core';
import { IconReload, IconSettings } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { TableContext } from '@/components/ProTable';

const Index = () => {
  const { columns, request } = useContext(TableContext);

  const [data, setData] = useState<Record<string, any>[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  console.log('pageNo', pageNo);

  const init = async () => {
    const res = await request!({ pageNo: 1, pageSize: 10 });
    if (res.code === 0) {
      setData(res.data?.data || []);
      setTotal(res.data?.total || 0);
      setPageNo(res.data?.pageNo || 1);
      setPageSize(res.data?.pageSize || 20);
    }
  };

  useEffect(() => {
    init().then();
  }, []);

  const thead = (
    <thead>
      <tr>
        {columns.map((item) => (
          <th
            key={item.key}
            style={{ width: item.width ? `${item.width}px` : '100px' }}
          >
            {item.title}
          </th>
        ))}
      </tr>
    </thead>
  );

  const tbody = (
    <tbody>
      {data.map((item, index) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td
              key={column.key}
              style={{ width: column.width ? `${column.width}px` : '100px' }}
            >
              {column?.render ? column.render(item, index) : item[column.key!]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <Paper shadow="xs" radius="md" p="lg" withBorder sx={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <Title order={3}>This is h3 title</Title>
        <Flex gap="xs">
          <Button radius="md" size="xs">
            新增
          </Button>
          <ActionIcon>
            <IconReload size="1.125rem" />
          </ActionIcon>
          <Popover
            width={200}
            position="bottom-end"
            withArrow
            shadow="md"
            radius="md"
          >
            <Popover.Target>
              <ActionIcon>
                <IconSettings size="1.125rem" />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>123</Popover.Dropdown>
          </Popover>
        </Flex>
      </Flex>
      <Space h="sm" />
      <Table striped highlightOnHover withBorder>
        {thead}
        {tbody}
      </Table>
      <Space h="sm" />
      <Pagination
        total={Math.ceil(total / pageSize)}
        size="sm"
        radius="md"
        withEdges
      />
    </Paper>
  );
};

export default Index;
