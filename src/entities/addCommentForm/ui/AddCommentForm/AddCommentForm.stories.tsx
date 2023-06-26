import { Meta, StoryFn } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AddCommentForm from './AddCommentForm';

export default {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AddCommentForm>;

const Template: StoryFn<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

const mock = (text: string) => { };

export const Normal = Template.bind({});
Normal.args = { sendComment: mock };
Normal.decorators = [StoreDecorator({})];
