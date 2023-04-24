import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
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
Readonly.args = {
  data: {
    firstname: 'Олег',
    lastname: 'Шевченко',
    age: 21,
    currency: Currency.USD,
    country: Country.Japan,
    city: 'Tokyo',
    username: 'disciplinedMonster',
    avatar: 'https://img2.akspic.ru/attachments/crops/9/3/9/9/6/169939/169939-anime-zenicu_agacuma-ubijca_demonov_kimetsu_no_yaiba-lyudi_v_prirode-multfilm-1920x1080.jpg',
  },
};
Readonly.decorators = [StoreDecorator({
  profile: {
    readonly: true,
    isLoading: false,
    error: null,
    form: null,
  },
})];

export const Editable = Template.bind({});
Editable.args = {
  data: {
    firstname: 'Олег',
    lastname: 'Шевченко',
    age: 21,
    currency: Currency.USD,
    country: Country.Japan,
    city: 'Tokyo',
    username: 'disciplinedMonster',
    avatar: 'https://img2.akspic.ru/attachments/crops/9/3/9/9/6/169939/169939-anime-zenicu_agacuma-ubijca_demonov_kimetsu_no_yaiba-lyudi_v_prirode-multfilm-1920x1080.jpg',
  },
};
Editable.decorators = [StoreDecorator({
  profile: {
    readonly: false,
    isLoading: false,
    error: null,
    form: null,
  },
})];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.decorators = [StoreDecorator({
  profile: {},
})];

export const Error = Template.bind({});
Error.args = {
  error: 'error',
};
Error.decorators = [StoreDecorator({
  profile: {},
})];
