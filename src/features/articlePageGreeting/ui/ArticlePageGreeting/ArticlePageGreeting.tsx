import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Drawer } from '@/shared/ui/Drawer';
import cls from './ArticlePageGreeting.module.scss';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { isArticlesPageWasOpened } = useJsonSettings();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
    }
  }, [dispatch, isArticlesPageWasOpened]);

  const closeModal = () => setIsOpen(false);

  const text = (
    <Text
      title={t('Добро пожаловать') as string}
      text={t('Здесь вы можете просматривать статьи на разные темы, а также писать свои') as string}
    />
  );

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={closeModal}>
        <div className={cls.drawerText}>{text}</div>
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={closeModal}>
      {text}
    </Modal>
  );
});
