import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

const data = {
  firstname: "Олег",
  lastname: "Козлов",
  age: 21,
  currency: Currency.EUR,
  country: Country.USA,
  city: "Москва",
  username: "disciplinedMonster?",
  avatar: "https://img2.akspic.ru/attachments/crops/9/3/9/9/6/169939/169939-anime-zenicu_agacuma-ubijca_demonov_kimetsu_no_yaiba-lyudi_v_prirode-multfilm-1920x1080.jpg"
}

describe('fetchProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk();

    expect(thunk.api.get).toBeCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error login', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
