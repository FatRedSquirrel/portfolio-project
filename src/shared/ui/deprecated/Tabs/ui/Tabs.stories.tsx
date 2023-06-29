import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ArticleType } from '@/entities/Article/model/types/article';
import { Tabs } from './Tabs';

export default {
  title: 'shared/deprecated/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  tabs: [
    {
      content: ArticleType.ALL,
      value: ArticleType.ALL,
    },
    {
      content: ArticleType.ECONOMICS,
      value: ArticleType.ECONOMICS,
    },
    {
      content: ArticleType.IT,
      value: ArticleType.IT,
    },
    {
      content: ArticleType.SCIENCE,
      value: ArticleType.SCIENCE,
    },
  ],
  value: ArticleType.ALL,
  onTabClick: action('onTabClick'),
};
