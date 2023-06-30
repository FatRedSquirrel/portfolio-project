import classNames from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import GridIcon from '@/shared/assets/icons/tile.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticleViewSelectorProps {
  className?: string;
  view?: ArticleView
  onViewClick: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.LIST,
    icon: ListIcon,
  },
  {
    view: ArticleView.GRID,
    icon: GridIcon,
  },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
  const {
    className,
    view = ArticleView.GRID,
    onViewClick,
  } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick(newView);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Card
          className={classNames(
            cls.ArticleViewSelectorRedesigned,
            className,
          )}
          border="round"
        >
          <HStack gap='8'>
            {viewTypes.map((viewType, index) => (
              <Icon
                clickable
                key={index}
                width={20}
                height={20}
                onClick={onClick(viewType.view)}
                Svg={viewType.icon}
                buttonClassName={classNames(
                  cls.viewTypeIcon,
                  viewType.view === view && cls.active,
                )}
              />
            ))}
          </HStack>
        </Card>
      )}
      off={(
        <div className={classNames(cls.ArticleViewSelector, className)}>
          {viewTypes.map((viewType) => (
            <Button
              key={viewType.view}
              className={classNames(cls.button, viewType.view === view ? cls.active : '')}
              theme={ButtonTheme.CLEAR}
              onClick={onClick(viewType.view)}
            >
              <viewType.icon />
            </Button>
          ))}
        </div>
      )}
    />
  );
};
