import { Meta, StoryFn } from '@storybook/react';
import { Code } from './Code';

export default {
  title: 'shared/Code',
  component: Code,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Code>;

const Template: StoryFn<typeof Code> = (args) => <Code {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text:
    `import { Meta, StoryFn } from '@storybook/react';
  import { Code } from './Code';
  
  export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  } as Meta<typeof Code>;
  
  const Template: StoryFn<typeof Code> = (args) => <Code {...args} />;`,
};
