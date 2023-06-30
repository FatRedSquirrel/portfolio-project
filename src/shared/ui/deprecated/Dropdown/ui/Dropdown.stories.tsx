import { StoryFn, Meta } from '@storybook/react';
import { Button } from '@/shared/ui/deprecated/Button';
import { Dropdown } from './Dropdown';

export default {
  title: 'shared/deprecated/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Dropdown>;

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

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

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
