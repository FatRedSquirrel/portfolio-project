import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileActions, profileReducer } from './profileSlice';

const data = {
  firstname: 'Олег',
  lastname: 'Козлов',
  age: 21,
  currency: Currency.EUR,
  country: Country.USA,
  city: 'Москва',
  username: 'disciplinedMonster?',
  avatar: 'https://img2.akspic.ru/attachments/crops/9/3/9/9/6/169939/169939-anime-zenicu_agacuma-ubijca_demonov_kimetsu_no_yaiba-lyudi_v_prirode-multfilm-1920x1080.jpg',
};

describe('loginSlice.test', () => {
  test('test updateProfile (lastname)', () => {
    const state: DeepPartial<ProfileSchema> = { form: { lastname: 'Шевченко' } };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.updateProfile({ lastname: 'Шевченко' }),
    )).toEqual({ form: { lastname: 'Шевченко' } });
  });

  test('test updateProfile (age)', () => {
    const state: DeepPartial<ProfileSchema> = { form: { age: 20 } };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.updateProfile({ age: 20 }),
    )).toEqual({ form: { age: 20 } });
  });

  test('test setReadonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.setReadonly(true),
    )).toEqual({ readonly: true });
  });

  test('update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      readonly: false,
      validationErrors: [ValidateProfileError.SERVER_ERROR],
    };
    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.pending,
    )).toEqual({
      isLoading: true,
      readonly: false,
      validationErrors: undefined,
    });
  });

  test('update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };
    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.fulfilled(data, '', '1'),
    )).toEqual({
      isLoading: false,
      validationErrors: undefined,
      readonly: true,
      form: data,
      error: null,
      data,
    });
  });
});
