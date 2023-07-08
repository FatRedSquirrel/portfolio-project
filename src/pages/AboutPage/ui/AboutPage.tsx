import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Page dataTestid='AboutPage'>
      <Text size='xl' title={t('О сайте') as string} />
      <div style={{
        display: 'flex',
        gap: 20,
        marginTop: 30,
      }}
      >
        <AppLink
          target='_blank'
          to='https://fatredsquirrel.github.io/portfolio-project-wiki/'
        >
          {t('Документация')}
        </AppLink>
        <AppLink
          target='_blank'
          to='https://fatredsquirrel.github.io/portfolio-project/'
        >
          Storybook
        </AppLink>
      </div>
    </Page>
  );
};

export default AboutPage;
