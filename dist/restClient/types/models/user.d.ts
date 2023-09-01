import { UserRoles, UserStatus } from '../../../constants';
export type User = {
    __rooms: Array<unknown>;
    _id: string;
    _updatedAt: Date;
    active: boolean;
    createdAt: Date;
    emails: Array<string>;
    name: string;
    roles: Array<UserRoles>;
    settings: object;
    status: UserStatus;
    type: UserRoles;
    username: string;
};
