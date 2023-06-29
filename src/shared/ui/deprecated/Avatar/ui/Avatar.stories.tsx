import { Meta, StoryFn } from '@storybook/react';
import { Avatar } from './Avatar';
import image from './image.jpg';

export default {
  title: 'shared/deprecated/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  size: 200,
  src: image,
};

export const Small = Template.bind({});
Small.args = {
  src: image,
};
