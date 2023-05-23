import { useParams } from 'react-router-dom';
import classNames from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/Text';

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
  const { className } = props;

  const { id } = useParams();

  const isEdit = !!id;

  return (
    <Page className={classNames(cls.articleEditPage, className)}>
      <Text
        title={`${isEdit ? 'Редактирование' : 'Создание'} статьи`}
      />
    </Page>
  );
};

export default ArticleEditPage;
