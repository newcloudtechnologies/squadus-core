/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { Errors } from '../constants';
import { RestClientError } from './RestClientError';
import { ErrorData } from './types';

export function setUserRoleErrorHandler(error: ErrorData): void {
    switch (error.errorType) {
        case Errors.InvalidUser:
            throw new RestClientError(Errors.InvalidUser, error);
        case Errors.UserAlreadyModerator:
            throw new RestClientError(Errors.UserAlreadyModerator, error);
        case Errors.UserNotModerator:
            throw new RestClientError(Errors.UserNotModerator, error);
        case Errors.UserAlreadyOwner:
            throw new RestClientError(Errors.UserAlreadyOwner, error);
        case Errors.UserNotOwner:
            throw new RestClientError(Errors.UserNotOwner, error);
        case Errors.UserAlreadyLeader:
            throw new RestClientError(Errors.UserAlreadyLeader, error);
        case Errors.UserNotLeader:
            throw new RestClientError(Errors.UserNotLeader, error);
        case Errors.UserNotInRoom:
            throw new RestClientError(Errors.UserNotInRoom, error);
    }
}
