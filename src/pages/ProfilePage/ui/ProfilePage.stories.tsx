import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ProfilePage from 'pages/ProfilePage/ui/ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
  profile: {
    error: null,
    form: {
      firstname: 'Олег',
      lastname: 'Козлов',
      age: 21,
      currency: Currency.RUB,
      country: Country.Japan,
      city: 'Москва',
      username: 'disciplinedMonster?',
      avatar: 'https://img2.akspic.ru/attachments/crops/9/3/9/9/6/169939/169939-anime-zenicu_agacuma-ubijca_demonov_kimetsu_no_yaiba-lyudi_v_prirode-multfilm-1920x1080.jpg',
    },
  },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = 
[ThemeDecorator(Theme.DARK), 
  StoreDecorator({
  profile: {
    error: null,
    form: {
      firstname: 'Олег',
      lastname: 'Козлов',
      age: 21,
      currency: Currency.RUB,
      country: Country.Japan,
      city: 'Москва',
      username: 'disciplinedMonster?',
      avatar: 'https://img2.akspic.ru/attachments/crops/9/3/9/9/6/169939/169939-anime-zenicu_agacuma-ubijca_demonov_kimetsu_no_yaiba-lyudi_v_prirode-multfilm-1920x1080.jpg',
    },
  },
})];
