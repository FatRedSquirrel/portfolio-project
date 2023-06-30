import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/features';

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <Page dataTestid='ForbiddenPage'>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Text title={t('У вас нет доступа к этой странице') as string} />
        )}
        off={(
          <TextDeprecated title={t('У вас нет доступа к этой странице') as string} />
        )}
      />
    </Page>
  );
};

export default ForbiddenPage;
