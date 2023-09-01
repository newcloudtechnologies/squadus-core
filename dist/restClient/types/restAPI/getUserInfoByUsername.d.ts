import { User } from '../models';
export type UserResponse = {
    success: boolean;
    user: User;
};
