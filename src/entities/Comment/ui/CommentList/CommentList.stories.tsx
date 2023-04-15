import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
  title: 'entities/comments/CommentList',
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
      avatar: 'https://www.hdwallpapers.in/download/boy_zenitsu_agatsuma_hd_demon_slayer_kimetsu_no_yaiba-HD.jpg',
    },
  },
  {
    id: '2',
    text: 'comment 2',
    user: {
      id: '2',
      username: 'user 2',
      avatar: 'https://www.hdwallpapers.in/download/boy_zenitsu_agatsuma_hd_demon_slayer_kimetsu_no_yaiba-HD.jpg',
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

export const Normal = Template.bind({});
Normal.args = {
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
