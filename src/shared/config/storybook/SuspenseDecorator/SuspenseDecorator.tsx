import { Suspense } from 'react';
import { StoryFn } from '@storybook/react';

export const SuspenseDecorator = (Story: StoryFn) => (
  <Suspense>
    <Story />
  </Suspense>
);
