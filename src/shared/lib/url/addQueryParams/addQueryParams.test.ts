import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value',
    });
    expect(params).toBe('?test=value');
  });

  test('test with multiple params', () => {
    const params = getQueryParams({
      test: 'value',
      test2: 'value2',
      test3: 'value3',
    });
    expect(params).toBe('?test=value&test2=value2&test3=value3');
  });

  test('test with undefined', () => {
    const params = getQueryParams({
      test: undefined,
    });
    expect(params).toBe('?');
  });

  test('test with one param undefined', () => {
    const params = getQueryParams({
      test: 'value',
      test2: undefined,
    });
    expect(params).toBe('?test=value');
  });
});
