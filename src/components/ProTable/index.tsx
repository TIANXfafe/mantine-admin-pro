import { Context, createContext, FC } from 'react';
import { Flex } from '@mantine/core';
import { IProps, ITableContext } from '@/components/ProTable/typing.ts';
import BasicTable from '@/components/ProTable/BasicTable';
import QueryForm from '@/components/ProTable/QueryForm';

export const TableContext: Context<ITableContext> = createContext({
  columns: [] as ITableContext['columns'],
  request: () => {}
});

const Index: FC<IProps> = ({
  columns = [],
  options = { reload: true, setting: true },
  request,
  params = {},
  manualRequest = false
}) => {
  console.log('options', options);
  console.log('params', params);
  console.log('manualRequest', manualRequest);

  return (
    <TableContext.Provider value={{ columns, request }}>
      <Flex
        p="xs"
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="column"
      >
        <QueryForm />
        <BasicTable />
      </Flex>
    </TableContext.Provider>
  );
};

export default Index;
