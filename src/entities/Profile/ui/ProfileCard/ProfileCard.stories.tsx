import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Readonly = Template.bind({});
Readonly.args = {};
Readonly.decorators = [StoreDecorator({
  profile: {
    readonly: true,
    isLoading: false,
    error: null,
    form: null,
  },
})];

export const Editable = Template.bind({});
Editable.args = {};
Editable.decorators = [StoreDecorator({
  profile: {
    readonly: false,
    isLoading: false,
    error: null,
    form: null,
  },
})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
  profile: {},
})];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({
  profile: {},
})];
