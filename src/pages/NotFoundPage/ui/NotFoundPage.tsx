import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Page className={cls.NotFoundPage}>
      {t('Страница не найдена')}
    </Page>
  );
};
