import { CSSProperties } from 'react';
import '../../../../app/styles/index.scss';
import { StoryFn } from '@storybook/react';

export const ContainerDecorator = (style: CSSProperties) => (Story: StoryFn) => (
  <div style={style}>
    <Story />
  </div>
);
