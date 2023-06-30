import { Meta, StoryFn } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
  title: 'entities/comments/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args) => <CommentCard {...args} />;

const comment = {
  id: '1',
  user: {
    id: '1',
    username: 'nice fella',
    avatar: 'https://www.hdwallpapers.in/download/boy_zenitsu_agatsuma_hd_demon_slayer_kimetsu_no_yaiba-HD.jpg',
  },
  text: 'very very nice article my dude',
};

export const Normal = Template.bind({});
Normal.args = { comment };

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = { comment };
NormalRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.args = { isLoading: true };

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = { isLoading: true };
LoadingRedesigned.decorators = [NewDesignDecorator];
