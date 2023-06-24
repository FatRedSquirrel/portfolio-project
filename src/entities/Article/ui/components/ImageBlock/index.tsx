import { memo } from 'react';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleBlockImage } from '../../../model/types/article';
import cls from './index.module.scss';
import { ToggleFeatures } from '@/shared/features';

interface ImageBlockProps {
  className?: string
  block: ArticleBlockImage
}

const ImageBlock = ({ block, className }: ImageBlockProps) => {
  const { title, src } = block;

  return (
    <div className={className}>
      <img className={cls.img} src={src} alt="" />
      {title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text title={title} className={cls.title} />}
          off={<TextDeprecated title={title} className={cls.title} />}
        />
      )}
    </div>
  );
};

export default memo(ImageBlock);
