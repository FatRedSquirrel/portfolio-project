import { useCallback } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string
  text: string
}

export const Code = (props: CodeProps) => {
  const {
    className,
    text,
  } = props;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.code, className)}>
      <Button
        theme={ButtonTheme.CLEAR}
        className={cls.copyBtn}
        onClick={copy}
      >
        <CopyIcon />
      </Button>
      <code>
        {text}
      </code>
    </pre>
  );
};
