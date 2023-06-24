import { memo, useEffect, useState } from 'react';
import classNames from '@/shared/lib/classNames/classNames';

import StarIcon from '@/shared/assets/icons/star.svg';

import cls from './StarRating.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface StarRatingProps {
  className?: string
  onSelect?: (starsCount: number) => void;
  size?: number
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5];

/**
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
  const {
    className,
    onSelect,
    size = 30,
    selectedStars,
  } = props;

  const [currentStarCount, setCurrentStarCount] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selectedStars) {
      setCurrentStarCount(selectedStars);
      setIsSelected(true);
    }
  }, [selectedStars]);

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected && onSelect) {
      onSelect(starsCount);
      setCurrentStarCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames(
      cls.starRating,
      className,
    )}
    >
      {stars.map((star, index) => {
        const commonProps = {
          key: index,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(star),
          onClick: onClick(star),
        };

        return (
          <ToggleFeatures
            feature='isAppRedesigned'
            on={(
              <Icon
                className={classNames(
                  cls.starRedesigned,
                  star <= currentStarCount && cls.hovered,
                  star <= currentStarCount && cls.selected,
                  isSelected && cls.noCursor,
                )}
                Svg={StarIcon}
                clickable={!isSelected}
                {...commonProps}
              />
            )}
            off={(
              <StarIcon
                className={classNames(
                  cls.star,
                  star <= currentStarCount && cls.hovered,
                  star <= currentStarCount && cls.selected,
                  isSelected && cls.noCursor,
                )}
                {...commonProps}
              />
            )}
          />
        );
      })}
    </div>
  );
});
