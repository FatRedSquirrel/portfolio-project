import classNames from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/list.svg';
import GridIcon from '@/shared/assets/icons/grid.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';

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
  );
};
