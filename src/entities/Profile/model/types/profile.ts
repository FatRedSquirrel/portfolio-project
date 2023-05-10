import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
    INCORRECT_CITY = 'INCORRECT_CITY',
    INCORRECT_USERNAME = 'INCORRECT_USERNAME'
}

export interface Profile {
    firstname?: string;
    lastname?: string;
    age?: number,
    currency?: Currency,
    country?: Country;
    city?: string,
    username?: string;
    avatar?: string;
}

export interface ProfileSchema {
    data: Profile | null;
    form: Profile | null;
    isLoading: boolean;
    error: string | null;
    readonly: boolean;
    validationErrors?: ValidateProfileError[];
}
