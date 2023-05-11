import {
  ChangeEvent, useCallback, useMemo, useState,
} from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Rating.module.scss';
import { StarRating } from '@/shared/ui/StarRating';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';

interface RatingProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
}

export const Rating = (props: RatingProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback = true,
    onCancel,
    onAccept,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startCount, setStartCount] = useState(0);
  const [feedback, setFeedback] = useState('');

  const selectStars = useCallback((selectedStarsCount: number) => {
    setStartCount(selectedStarsCount);
    if (hasFeedback) {
      setIsModalOpen(true);
    } else {
      onAccept?.(selectedStarsCount);
    }
  }, [hasFeedback, onAccept]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAcept = useCallback(() => {
    closeModal();
    onAccept?.(startCount, feedback);
  }, [feedback, onAccept, startCount]);

  const handleCancel = useCallback(() => {
    closeModal();
    onCancel?.(startCount);
  }, [onCancel, startCount]);

  const handleFeedbackChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value);
  };

  const modalContent = useMemo(() => (
    <VStack max gap='32'>
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder='Ваш отзыв'
      />
    </VStack>
  ), [feedback, feedbackTitle]);

  return (
    <Card className={classNames(
      cls.ratingCard,
      className,
    )}
    >
      <VStack align='center' gap='8'>
        <Text title={title} />
        <StarRating size={40} onSelect={selectStars} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} onClose={handleCancel} lazy>
          {modalContent}
          <HStack max gap='16' justify='end'>
            <Button
              theme={ButtonTheme.OUTLINE_RED}
              onClick={handleCancel}
            >
              Закрыть
            </Button>
            <Button onClick={handleAcept}>
              Отправить
            </Button>
          </HStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer
          isOpen={isModalOpen}
          onClose={handleCancel}
          inverted
          lazy
        >
          {modalContent}
          <Button
            className={cls.sendBtnMobile}
            onClick={handleAcept}
          >
            Отправить
          </Button>
        </Drawer>
      </MobileView>
    </Card>
  );
};
