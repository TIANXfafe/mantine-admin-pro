import { Popover, Tabs, Indicator, Group, Badge } from '@mantine/core';
import { IconBellRinging } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import Container from '@/layout/Notify/Container';
import NotifyItem from '@/layout/Notify/NotifyItem';
import MessageItem from '@/layout/Notify/MessageItem.tsx';
import TodoItem from '@/layout/Notify/TodoItem.tsx';

const Notify = () => {
  const { t } = useTranslation();

  return (
    <Popover
      width={360}
      position="bottom-end"
      withArrow
      shadow="md"
      transitionProps={{ transition: 'scale', duration: 150 }}
    >
      <Popover.Target>
        <Indicator
          withBorder
          processing
          size={13}
          style={{ cursor: 'pointer' }}
        >
          <IconBellRinging size={18} />
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Tabs defaultValue="notice">
          <Tabs.List position="center">
            <Tabs.Tab value="notice">
              <Group spacing="xs">
                {t('global.layout.header.right.notify.notice')}
                <Badge size="xs">99+</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="message">
              <Group spacing="xs">
                {t('global.layout.header.right.notify.message')}
                <Badge size="xs">12</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="todo">
              <Group spacing="xs">
                {t('global.layout.header.right.notify.todo')}
                <Badge size="xs">6</Badge>
              </Group>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="notice" pt={0}>
            <Container>
              <>
                <NotifyItem title="测试通知" time="五天前" isRead />
                <NotifyItem title="测试通知" time="五天前" />
                <NotifyItem title="测试通知" time="五天前" isRead />
                <NotifyItem title="测试通知" time="五天前" isRead />
                <NotifyItem title="测试通知" time="五天前" />
                <NotifyItem title="测试通知" time="五天前" />
                <NotifyItem title="测试通知" time="五天前" />
                <NotifyItem title="测试通知" time="五天前" isRead />
              </>
            </Container>
          </Tabs.Panel>

          <Tabs.Panel value="message" pt={0}>
            <Container>
              <>
                <MessageItem
                  nickname="张三"
                  content="你今天有空吗你今天有空吗你今天有空吗你今天有空吗你今天有空吗你今天有空吗你今天有空吗?"
                  avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  isRead
                />
                <MessageItem
                  nickname="张三"
                  content="你今天有空吗?"
                  avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  isRead
                />
                <MessageItem
                  nickname="张三"
                  content="你今天有空吗?"
                  avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                />
                <MessageItem
                  nickname="张三"
                  content="你今天有空吗?"
                  avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  isRead
                />
                <MessageItem
                  nickname="张三"
                  content="你今天有空吗?"
                  avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                />
              </>
            </Container>
          </Tabs.Panel>

          <Tabs.Panel value="todo" pt={0}>
            <Container>
              <>
                <TodoItem
                  title="任务名称"
                  desc="需要你在1月30号前完成"
                  status={0}
                />
                <TodoItem
                  title="任务名称"
                  desc="当前任务正在进行中当前任务正在进行中当前任务正在进行中当前任务正在进行中当前任务正在进行中当前任务正在进行中"
                  status={1}
                />
                <TodoItem title="任务名称" desc="务必完成任务" status={2} />
                <TodoItem
                  title="任务名称"
                  desc="分配给你一个新任务"
                  status={3}
                />
                <TodoItem
                  title="任务名称"
                  desc="需要你在1月30号前完成"
                  status={0}
                />
                <TodoItem
                  title="任务名称"
                  desc="当前任务正在进行中当前任务正在进行中当前任务正在进行中当前任务正在进行中当前任务正在进行中当前任务正在进行中"
                  status={1}
                />
                <TodoItem title="任务名称" desc="务必完成任务" status={2} />
                <TodoItem
                  title="任务名称"
                  desc="分配给你一个新任务"
                  status={3}
                />
                <TodoItem
                  title="任务名称"
                  desc="需要你在1月30号前完成"
                  status={0}
                />
                <TodoItem
                  title="任务名称"
                  desc="当前任务正在进行中当前任务正在进行中当前任务正在进行中当前任务正在进行中当前任务正在进行中当前任务正在进行中"
                  status={1}
                />
                <TodoItem title="任务名称" desc="务必完成任务" status={2} />
                <TodoItem
                  title="任务名称"
                  desc="分配给你一个新任务"
                  status={3}
                />
              </>
            </Container>
          </Tabs.Panel>
        </Tabs>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Notify;
