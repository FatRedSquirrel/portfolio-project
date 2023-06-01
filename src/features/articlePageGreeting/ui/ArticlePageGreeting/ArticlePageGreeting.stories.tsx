import { StoryFn, Meta } from '@storybook/react';

import { ArticlePageGreeting } from './ArticlePageGreeting';

export default {
  title: 'features/ArticlePageGreeting',
  component: ArticlePageGreeting,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticlePageGreeting>;

const Template: StoryFn<typeof ArticlePageGreeting> = (args) => <ArticlePageGreeting />;

export const Normal = Template.bind({});
Normal.args = {

};
