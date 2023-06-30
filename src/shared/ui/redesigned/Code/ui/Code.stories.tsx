import { Meta, StoryFn } from '@storybook/react';
import { Code } from './Code';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ContainerDecorator } from '@/shared/config/storybook/ContainerDecorator';

export default {
  title: 'ui/redesigned/CodeBlock',
  component: Code,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [ContainerDecorator({ padding: 60 })],
} as Meta<typeof Code>;

const Template: StoryFn<typeof Code> = (args) => <Code {...args} />;

const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid suscipit possimus nisi odit, cupiditate autem ratione accusamus ipsa esse facilis.';

export const Normal = Template.bind({});
Normal.args = {
  text,
};
Normal.decorators = [NewDesignDecorator];
