import { Divider, Group, Text, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles({
  content: {
    height: '40px',
    display: 'flex'
  },
  actionBtn: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
});

const Footer = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Group className={classes.content}>
      <Text className={classes.actionBtn} fz={14}>
        {t('global.layout.header.right.notify.clear')}
      </Text>
      <Divider orientation="vertical" p={0} />
      <Text className={classes.actionBtn} fz={14}>
        {t('global.layout.header.right.notify.more')}
      </Text>
    </Group>
  );
};

export default Footer;
