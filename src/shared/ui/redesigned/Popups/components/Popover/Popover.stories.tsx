import { Meta, StoryFn } from '@storybook/react';
import { Popover } from './Popover';
import { ContainerDecorator } from '@/shared/config/storybook/ContainerDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Button } from '../../../Button';

export default {
  title: 'shared/redesigned/Popups/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ContainerDecorator({ width: 'fit-content', padding: 300 }), NewDesignDecorator],
} as Meta<typeof Popover>;

const Template: StoryFn<typeof Popover> = (args) => <Popover {...args} />;

const children = (
  <div style={{ width: 250, textAlign: 'center' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium repellendus autem, aliquid tempore sed sit! Enim explicabo esse iure ut.</div>
);

const trigger = <Button>trigger</Button>;

export const BottomRight = Template.bind({});
BottomRight.args = {
  children,
  trigger,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  children,
  trigger,
  direction: 'bottom left',
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  children,
  trigger,
  direction: 'top left',
};

export const TopRight = Template.bind({});
TopRight.args = {
  children,
  trigger,
  direction: 'top right',
};
