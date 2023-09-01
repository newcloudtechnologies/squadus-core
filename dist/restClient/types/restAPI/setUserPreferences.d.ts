import { UserPreferences } from '../models/userPreferences';
export type UserPreferencesData = {
    user: {
        _id: string;
        settings: {
            preferences: UserPreferences;
        };
    };
};
export type UserPreferencesRequestParams = {
    data: UserPreferences;
    userId: string;
};
