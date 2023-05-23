import { Meta, StoryFn } from '@storybook/react';
import { Card } from './Card';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

const Normal = Template.bind({});
Normal.args = {};
