import { Meta, StoryFn } from '@storybook/react';
import { Dropdown, DropdownItem } from './Dropdown';
import { ContainerDecorator } from '@/shared/config/storybook/ContainerDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Button } from '../../../Button';

export default {
  title: 'shared/redesigned/Popups/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ContainerDecorator({ width: 'fit-content', padding: 300 }), NewDesignDecorator],
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

const items: DropdownItem[] = [
  {
    content: <div style={{ width: 200 }}>Statement 1</div>,
  },
  {
    content: <div style={{ width: 200 }}>Statement 2</div>,
  },
  {
    content: <div style={{ width: 200 }}>Statement 3 (disabled)</div>,
    disabled: true,
  },
];

const trigger = <Button>trigger</Button>;

export const BottomRight = Template.bind({});
BottomRight.args = {
  items,
  trigger,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  items,
  direction: 'bottom left',
  trigger,
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  items,
  direction: 'top left',
  trigger,
};

export const TopRight = Template.bind({});
TopRight.args = {
  items,
  direction: 'top right',
  trigger,
};
