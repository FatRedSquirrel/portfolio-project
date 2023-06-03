import classNames from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

/**
 * @deprecated
 */
export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={classNames(cls.PageLoader, className)}>
    <Loader />
  </div>
);
