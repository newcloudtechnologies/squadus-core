export type SettingsItem = {
    _id: string;
    enterprise: boolean;
    value: string | Array<string> | number | boolean;
};
export type SettingsData = {
    count: number;
    offset: number;
    settings: Array<SettingsItem>;
    success: boolean;
    total: number;
};
