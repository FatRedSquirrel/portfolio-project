import {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Rating.module.scss';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

interface RatingProps {
  className?: string
  title?: string
  feedbackTitle?: string
  rate?: number
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
}

export const Rating = (props: RatingProps) => {
  const {
    className,
    title,
    feedbackTitle,
    rate,
    onCancel,
    onAccept,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate || 0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (rate) {
      setStarsCount(rate);
    }
    // eslint-disable-next-line
  }, [rate]);

  const selectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount);
    if (feedbackTitle) {
      setIsModalOpen(true);
    } else {
      onAccept?.(selectedStarsCount);
    }
  }, [feedbackTitle, onAccept]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAcept = useCallback(() => {
    closeModal();
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const handleCancel = useCallback(() => {
    closeModal();
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const handleFeedbackChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value);
  };

  const modalContent = useMemo(() => (
    <VStack className={cls.modalContent} max gap='16'>
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
        <StarRating
          size={40}
          selectedStars={starsCount}
          onSelect={selectStars}
        />
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
