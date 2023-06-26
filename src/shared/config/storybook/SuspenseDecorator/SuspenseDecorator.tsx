import { Suspense } from 'react';

export const SuspenseDecorator = (Story: any) => (
  <Suspense>
    <Story />
  </Suspense>
);
