import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import { ListBox } from 'shared/ui/ListBox';
import { Dropdown } from 'shared/ui/Dropdown';

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <Page>
      О сайте
    </Page>
  );
};

export default AboutPage;
