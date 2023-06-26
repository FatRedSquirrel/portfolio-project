import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Выберите страну',
  options: [
    { value: '123', content: 'циферки' },
    { value: 'abc', content: 'буковки' },
    { value: 'zxc', content: 'монстер' },
  ],
};
