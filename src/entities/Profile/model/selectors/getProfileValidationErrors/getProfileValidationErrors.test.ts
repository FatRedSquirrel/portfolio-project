import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileValidationErrors } from './getProfileValidationErrors';
import { ValidateProfileError } from '../../types/profile';

describe('getProfileValidationErrors', () => {
  test('should return profile validationErrors', () => {
    const validationErrors = [ValidateProfileError.INCORRECT_AGE, ValidateProfileError.INCORRECT_USER_DATA];
    const state: DeepPartial<StateSchema> = {
      profile: {
        validationErrors,
      },
    };
    expect(getProfileValidationErrors(state as StateSchema)).toEqual(validationErrors);
  });
});
