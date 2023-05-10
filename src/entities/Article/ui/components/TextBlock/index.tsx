import { memo } from 'react';
import { Text } from '@/shared/ui/Text';
import { ArticleBlockText } from '../../../model/types/article';
import cls from './index.module.scss';

interface TextBlockProps {
  className?: string
  block: ArticleBlockText
}

const TextBlock = ({ block, className }: TextBlockProps) => {
  const { title, paragraphs } = block;

  return (
    <div className={className}>
      {title && (
        <Text title={title} className={cls.title} />
      )}
      {paragraphs.map((paragraph) => (
        <Text
          key={paragraph}
          text={paragraph}
          className={cls.paragraph}
        />
      ))}
    </div>
  );
};

export default memo(TextBlock);
