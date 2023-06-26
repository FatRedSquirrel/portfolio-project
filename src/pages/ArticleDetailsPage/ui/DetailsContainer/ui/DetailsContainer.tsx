import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContainterProps {
    className?: string;
}

export const DetailsContainer = memo((props: DetailsContainterProps) => {
  const { className } = props;

  return (
    <Card fullWidth border="round" className={className} padding="24">
      <ArticleDetails />
    </Card>
  );
});
