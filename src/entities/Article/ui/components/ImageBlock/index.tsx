import { memo } from 'react';
import { Text } from '@/shared/ui/Text';
import { ArticleBlockImage } from '../../../model/types/article';
import cls from './index.module.scss';

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
        <Text title={title} className={cls.title} />
      )}
    </div>
  );
};

export default memo(ImageBlock);
