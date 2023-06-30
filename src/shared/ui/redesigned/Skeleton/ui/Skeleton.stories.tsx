import { Meta, StoryFn } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ContainerDecorator } from '@/shared/config/storybook/ContainerDecorator';

export default {
  title: 'ui/redesigned/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ContainerDecorator({ padding: 60 })],
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  width: 400,
  height: 120,
};

export const Circle = Template.bind({});
Circle.args = {
  width: 200,
  height: 200,
  border: '100%',
};
