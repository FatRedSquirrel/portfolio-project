import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListBox as ListBoxRedesigned } from '@/shared/ui/redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/ListBox';
import { Text } from '@/shared/ui/redesigned/Text';
import { getFeatureFlag, toggleFeatures } from '@/shared/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { updateFeatureFlag } from '@/shared/features/updateFeatureFlag';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const forceUpdate = useForceUpdate();

  const [isLoading, setIsLoading] = useState(false);

  const items = [
    {
      content: t('Новый'),
      value: 'new',
    },
    {
      content: t('Старый'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlag({
          userId: authData.id,
          newFeatures: {
            isAppRedesigned: value === 'new',
          },
        }),
      ).unwrap();
      setIsLoading(false);
      forceUpdate();
    }
  };

  const ListBox = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => ListBoxRedesigned,
    off: () => ListBoxDeprecated,
  });

  return (
    <HStack gap='16'>
      <Text text={t('Вариант интерфейса') as string} />
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          onChange={onChange}
          items={items}
          value={isAppRedesigned ? 'new' : 'old'}
          className={className}
        />
      )}
    </HStack>
  );
});
