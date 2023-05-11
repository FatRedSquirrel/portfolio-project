import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Rating } from '@/entities/Rating';

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <Page>
      О сайте
      <Rating
        title='Оставьте отзыв о статье'
        feedbackTitle='Оставьте отзыв о статье'
      />
    </Page>
  );
};

export default AboutPage;
