import {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Rating.module.scss';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card';

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

  const { t } = useTranslation();

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <VStack className={cls.modalContent} max gap='16'>
          <Text title={feedbackTitle} />
          <Input
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder={t('Ваш отзыв') as string}
          />
        </VStack>
      )}
      off={(
        <VStack className={cls.modalContent} max gap='16'>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder={t('Ваш отзыв') as string}
          />
        </VStack>
      )}
    />
  ), [feedback, feedbackTitle, t]);

  const content = (
    <>
      <VStack align='center' gap='8'>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text title={title} />}
          off={<TextDeprecated title={title} />}
        />
        <StarRating
          size={40}
          selectedStars={starsCount}
          onSelect={selectStars}
        />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} onClose={handleCancel} lazy>
          {modalContent}
          <ToggleFeatures
            feature='isAppRedesigned'
            on={(
              <HStack max gap='16' justify='end'>
                <Button variant='negative' onClick={handleCancel}>
                  {t('Закрыть')}
                </Button>
                <Button onClick={handleAcept}>
                  {t('Отправить')}
                </Button>
              </HStack>
            )}
            off={(
              <HStack max gap='16' justify='end'>
                <ButtonDeprecated
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={handleCancel}
                >
                  {t('Закрыть')}
                </ButtonDeprecated>
                <ButtonDeprecated onClick={handleAcept}>
                  {t('Отправить')}
                </ButtonDeprecated>
              </HStack>
            )}
          />
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
          <ToggleFeatures
            feature='isAppRedesigned'
            on={(
              <Button
                className={cls.sendBtnMobile}
                onClick={handleAcept}
              >
                {t('Отправить')}
              </Button>
            )}
            off={(
              <ButtonDeprecated
                className={cls.sendBtnMobile}
                onClick={handleAcept}
              >
                {t('Отправить')}
              </ButtonDeprecated>
            )}
          />
        </Drawer>
      </MobileView>
    </>
  );

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <Card
          padding='24'
          border='round'
          className={classNames(
            cls.ratingCard,
            className,
          )}
          fullWidth
        >
          {content}
        </Card>
      )}
      off={(
        <CardDeprecated className={classNames(
          cls.ratingCard,
          className,
        )}
        >
          {content}
        </CardDeprecated>
      )}
    />
  );
};
