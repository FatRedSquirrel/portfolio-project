import { StoryFn, Meta } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ListBox>;

const items = Array(3).fill(true).map((item, index) => ({
  value: `item${index + 1}`,
  content: `item${index + 1}`,
}));

const { value } = items[0];

const Template: StoryFn<typeof ListBox> = (args) => <ListBox {...args} />;

export const BottomDirection = Template.bind({});
BottomDirection.args = {
  items,
  value,
};

export const TopDirection = Template.bind({});
TopDirection.args = {
  style: {
    marginTop: 200,
  },
  items,
  value,
  direction: 'top right',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  items,
  value,
  label: 'Выберите значение',
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  items,
  defaultValue: 'Select item',
};

export const WithDisabledItem = Template.bind({});
WithDisabledItem.args = {
  items: [...items, {
    value: `item${items.length + 1}`,
    content: `item${items.length + 1}`,
    disabled: true,
  }],
  defaultValue: 'Select item',
};

export const Readonly = Template.bind({});
Readonly.args = {
  items,
  defaultValue: 'Select item',
  readonly: true,
};
