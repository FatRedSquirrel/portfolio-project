import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import cls from './NotFoundPage.module.scss';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/features';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Page
      className={cls.NotFoundPage}
      dataTestid='NotFoundPage'
    >
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Text title={t('Страница не найдена') as string} />
        )}
        off={(
          <TextDeprecated title={t('Страница не найдена') as string} />
        )}
      />
    </Page>
  );
};
