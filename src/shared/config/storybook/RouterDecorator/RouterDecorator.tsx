import { BrowserRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';

export const RouterDecorator = (Story: StoryFn) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);
