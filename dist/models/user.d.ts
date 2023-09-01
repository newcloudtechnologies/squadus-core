import { UserRoles, UserStatus } from '../constants';
export type CurrentUser = ShortUser & UserWithRoles & {
    avatarETag: string;
    customFields?: {
        [name: string]: unknown;
    };
    emails?: {
        address: string;
        verified: boolean;
    }[];
    language?: string;
    loginEmailPassword?: string;
    showMessageInMainThread: boolean;
    status: UserStatus;
    statusLivechat: string;
    statusText: string | null;
};
export type ShortUser = {
    id: string;
    name: string;
    username: string;
};
export { UserRoles, UserStatus };
export type UserWithRoles = ShortUser & {
    roles: UserRoles[];
    token: string;
};
