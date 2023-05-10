import { validateProfileData } from './validateProfileData';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { ValidateProfileError } from '../../types/profile';

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

describe('validateProfileData.test', () => {
  test('no errors', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('incorrect user data', async () => {
    const result = validateProfileData({
      ...data,
      firstname: '',
      lastname: '',
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('incorrect age', async () => {
    const result = validateProfileData({
      ...data,
      age: 0,
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test('incorrect city', async () => {
    const result = validateProfileData({
      ...data,
      city: '',
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_CITY]);
  });

  test('incorrect user data & age', async () => {
    const result = validateProfileData({
      ...data,
      firstname: '',
      age: 0,
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE]);
  });
});
