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

export function addUserToRoomErrorHandler(error: ErrorData): void {
    switch (error.errorType) {
        case Errors.InvalidUsername:
            throw new RestClientError(Errors.InvalidUsername, error);
        case Errors.InvalidUser:
            throw new RestClientError(Errors.InvalidUser, error);
        case Errors.CantInviteForDirectRoom:
            throw new RestClientError(Errors.CantInviteForDirectRoom, error);
    }
}
