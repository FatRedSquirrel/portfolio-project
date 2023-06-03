import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/deprecated/Text';

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
  const { className } = props;

  const { id } = useParams();

  const isEdit = !!id;

  return (
    <Page className={className}>
      <Text
        title={`${isEdit ? 'Редактирование' : 'Создание'} статьи`}
      />
    </Page>
  );
};

export default ArticleEditPage;
