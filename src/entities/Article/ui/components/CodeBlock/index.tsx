import { memo } from 'react';
import { Code } from '@/shared/ui/Code';
import { ArticleBlockCode } from '../../../model/types/article';

interface CodeBlockProps {
  className?: string
  block: ArticleBlockCode
}

const CodeBlock = ({ block, className }: CodeBlockProps) => {
  const { code } = block;

  return (
    <div className={className}>
      <div className={cls.code}>
        <Code text={code} />
      </div>
    </div>
  );
};

export default memo(CodeBlock);
