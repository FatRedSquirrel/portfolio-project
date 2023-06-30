import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Input } from '@/shared/ui/deprecated/Input';

export default {
  title: 'ui/deprecated/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Type text',
  value: '123123',
};
