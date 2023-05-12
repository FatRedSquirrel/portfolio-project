import { memo, useEffect, useState } from 'react';
import classNames from '@/shared/lib/classNames/classNames';

import StarIcon from '@/shared/assets/icons/star.svg';

import cls from './StarRating.module.scss';

interface StarRatingProps {
  className?: string
  onSelect?: (starsCount: number) => void;
  size?: number
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5];

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
      {stars.map((star, index) => (
        <StarIcon
          width={size}
          height={size}
          className={classNames(
            cls.star,
            star <= currentStarCount && cls.hovered,
            star <= currentStarCount && cls.selected,
            isSelected && cls.noCursor,
          )}
          key={index}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(star)}
          onClick={onClick(star)}
        />
      ))}
    </div>
  );
});
