import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Rating } from '@/entities/Rating';

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <Page dataTestid='AboutPage'>
      О сайте
    </Page>
  );
};

export default AboutPage;
