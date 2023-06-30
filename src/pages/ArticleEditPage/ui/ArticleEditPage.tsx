import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/deprecated/Text';

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const { id } = useParams();

  const isEdit = !!id;

  const title = isEdit ? t('Редактирование статьи') : t('Создание статьи');

  return (
    <Page className={className}>
      <Text
        title={title}
      />
    </Page>
  );
};

export default ArticleEditPage;
