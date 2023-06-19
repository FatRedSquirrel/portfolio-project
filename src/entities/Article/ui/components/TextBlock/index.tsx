import { memo } from 'react';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleBlockText } from '../../../model/types/article';
import cls from './index.module.scss';
import { ToggleFeatures } from '@/shared/features';

interface TextBlockProps {
  className?: string
  block: ArticleBlockText
}

const TextBlock = ({ block, className }: TextBlockProps) => {
  const { title, paragraphs } = block;

  return (
    <div className={className}>
      {title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text title={title} className={cls.title} />}
          off={<TextDeprecated title={title} className={cls.title} />}
        />
      )}
      {paragraphs.map((paragraph) => (
        <ToggleFeatures
          key={paragraph}
          feature='isAppRedesigned'
          on={(
            <Text
              className={cls.paragraph}
              key={paragraph}
              text={paragraph}
            />
          )}
          off={(
            <TextDeprecated
              className={cls.paragraph}
              key={paragraph}
              text={paragraph}
            />
          )}
        />
      ))}
    </div>
  );
};

export default memo(TextBlock);
