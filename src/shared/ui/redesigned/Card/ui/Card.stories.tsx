import { Meta, StoryFn } from '@storybook/react';
import { Card } from './Card';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
  title: 'shared/redesigned/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

const children = 'Lorem, ipsum dolor.';

export const Normal = Template.bind({});
Normal.args = {
  variant: 'normal',
  children,
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  children,
};

export const Light = Template.bind({});
Light.args = {
  variant: 'light',
  children,
};
