import { Meta, StoryFn } from '@storybook/react';
import { Skeleton } from './Skeleton';

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  width: '100%',
  height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
  round: true,
  width: 100,
  height: 100,
};
