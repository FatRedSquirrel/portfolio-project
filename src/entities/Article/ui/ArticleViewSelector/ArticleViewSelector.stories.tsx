import { Meta, StoryFn } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';

export default {
  title: 'ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleViewSelector>;

const Template: StoryFn<typeof ArticleViewSelector> = (args) => <ArticleViewSelector {...args} />;

const Normal = Template.bind({});
Normal.args = {
  onViewClick: () => console.log('hi'),
};
