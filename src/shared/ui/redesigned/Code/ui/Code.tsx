import { memo, useCallback } from 'react';
import { classNamesRedesigned } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { Button, ButtonTheme } from '../../../deprecated/Button';
import cls from './Code.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Icon } from '../../Icon';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <pre
          className={classNamesRedesigned(cls.CodeRedesigned, {}, [className])}
        >
          <div className={cls.copyBtn}>
            <Icon
              clickable
              onClick={onCopy}
              Svg={CopyIconNew}
            />
          </div>
          <code>{text}</code>
        </pre>
      )}
      off={(
        <pre className={classNamesRedesigned(cls.Code, {}, [className])}>
          <Button
            onClick={onCopy}
            className={cls.copyBtn}
            theme={ButtonTheme.CLEAR}
          >
            <CopyIcon className={cls.copyIcon} />
          </Button>
          <code>{text}</code>
        </pre>
      )}
    />
  );
});
