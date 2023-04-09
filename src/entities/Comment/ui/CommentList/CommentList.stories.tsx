import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
  title: 'entities/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

const comments = [
  {
    id: '1',
    text: 'comment 1',
    user: {
      id: '1',
      username: 'user 1',
    },
  },
  {
    id: '2',
    text: 'comment 2',
    user: {
      id: '2',
      username: 'user 2',
    },
  },
  {
    id: '3',
    text: 'comment 3',
    user: {
      id: '3',
      username: 'user 3',
    },
  },
];

export const Primary = Template.bind({});
Primary.args = {
  comments,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  comments: [],
};
