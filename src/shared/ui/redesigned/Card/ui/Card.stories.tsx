import { Meta, StoryFn } from '@storybook/react';
import { Card } from './Card';
import { ContainerDecorator } from '@/shared/config/storybook/ContainerDecorator';

export default {
  title: 'ui/redesigned/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ContainerDecorator({ padding: 60, width: 600, height: 400 })],
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

const children = 'Lorem, ipsum dolor.';

export const Normal = Template.bind({});
Normal.args = {
  variant: 'normal',
  fullHeight: true,
  children,
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  fullHeight: true,
  children,
};

export const Light = Template.bind({});
Light.args = {
  variant: 'light',
  fullHeight: true,
  children,
};
