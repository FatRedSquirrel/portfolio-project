import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@/shared/ui/Button';
import { Dropdown } from './Dropdown';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Dropdown>;

const items = [
  {
    content: 'item1',
  },
  {
    content: 'item2',
  },
  {
    content: 'item3',
  },
];

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const DropRight = Template.bind({});
DropRight.args = {
  trigger: <Button>Open menu</Button>,
  items,
  direction: 'right',
};

export const DropLeft = Template.bind({});
DropLeft.args = {
  trigger: <Button>Open menu</Button>,
  items,
  direction: 'left',
  style: {
    marginLeft: 400,
  },
};
