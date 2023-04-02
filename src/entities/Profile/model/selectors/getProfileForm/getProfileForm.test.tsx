import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

describe('getProfileForm', () => {
  test('should return profile form', () => {

    const form = {
      firstname: "Олег",
      lastname: "Козлов",
      age: 21,
      currency: Currency.EUR,
      country: Country.USA,
      city: "Москва",
      username: "disciplinedMonster?",
      avatar: "https://img2.akspic.ru/attachments/crops/9/3/9/9/6/169939/169939-anime-zenicu_agacuma-ubijca_demonov_kimetsu_no_yaiba-lyudi_v_prirode-multfilm-1920x1080.jpg"
    }

    const state: DeepPartial<StateSchema> = {
      profile: {
        form
      },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });
});
