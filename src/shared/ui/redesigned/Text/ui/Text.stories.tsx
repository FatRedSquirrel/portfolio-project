import { Meta, StoryFn } from '@storybook/react';
import { Text } from './Text';
import { ContainerDecorator } from '@/shared/config/storybook/ContainerDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
  title: 'ui/redesigned/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ContainerDecorator({ padding: 60, width: 800 })],
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args) => <Text {...args} />;

const title = 'Это название';
const text = 'Это основной текст';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l' | 'xl';

export const Error = Template.bind({});
Error.args = {
  title,
  text,
  variant: 'error',
};

export const AlignCenter = Template.bind({});
AlignCenter.args = {
  title,
  text,
  align: 'center',
};

export const AlignRight = Template.bind({});
AlignRight.args = {
  title,
  text,
  align: 'right',
};

export const SizeS = Template.bind({});
SizeS.args = {
  title,
  text,
  size: 's',
};

export const SizeM = Template.bind({});
SizeM.args = {
  title,
  text,
};

export const SizeL = Template.bind({});
SizeL.args = {
  title,
  text,
  size: 'l',
};

export const SizeXL = Template.bind({});
SizeXL.args = {
  title,
  text,
  size: 'xl',
};
