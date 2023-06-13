import { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import classNames from '@/shared/lib/classNames/classNames';

interface AppLogoProps {
    className?: string;
}

export const AppLogo = memo(({ className }: AppLogoProps) => (
  <HStack
    max
    justify="center"
    className={classNames(cls.appLogoWrapper, {}, [className])}
  >
    <AppSvg className={cls.appLogo} />
    <div className={cls.gradientBig} />
    <div className={cls.gradientSmall} />
  </HStack>
));
