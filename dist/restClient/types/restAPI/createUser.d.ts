import { UserRoles } from '../../../constants';
export { UserRoles };
export type CreateUserRequestParams = {
    email: string;
    name: string;
    password: string;
    roles?: UserRoles[];
    userName: string;
};
