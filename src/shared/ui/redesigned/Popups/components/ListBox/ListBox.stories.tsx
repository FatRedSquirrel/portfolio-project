import { Meta, StoryFn } from '@storybook/react';
import { ListBox, ListBoxItem } from './ListBox';
import { ContainerDecorator } from '@/shared/config/storybook/ContainerDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import cls from './ListBox.module.scss';

export default {
  title: 'shared/redesigned/Popups/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ContainerDecorator({ maxWidth: 1600, padding: 300 }), NewDesignDecorator],
} as Meta<typeof ListBox>;

const Template: StoryFn<typeof ListBox> = (args) => <ListBox {...args} />;

const items: ListBoxItem[] = [
  {
    content: 'Опция 1',
    value: 'options 1',
  },
  {
    content: 'Опция 2',
    value: 'options 2',
  },
  {
    content: 'Опция 3 (disabled)',
    value: 'options 3',
    disabled: true,
  },
];

export const BottomRight = Template.bind({});
BottomRight.args = {
  items,
  value: items[0].value,
  label: 'BottomRight',
  className: cls.stories,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  items,
  value: items[0].value,
  label: 'BottomLeft',
  direction: 'bottom left',
  className: cls.stories,
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  items,
  value: items[0].value,
  label: 'TopLeft',
  direction: 'top left',
  className: cls.stories,
};

export const TopRight = Template.bind({});
TopRight.args = {
  items,
  value: items[0].value,
  label: 'TopRight',
  direction: 'top right',
  className: cls.stories,
};

export const Readonly = Template.bind({});
Readonly.args = {
  items,
  value: items[0].value,
  label: 'Readonly',
  readonly: true,
  className: cls.stories,
};
