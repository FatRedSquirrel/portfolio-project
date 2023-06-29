import { Meta, StoryFn } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ContainerDecorator } from '@/shared/config/storybook/ContainerDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
  title: 'shared/redesigned/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ContainerDecorator({ padding: 60 })],
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
  width: 400,
  height: 120,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  width: 400,
  height: 120,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
