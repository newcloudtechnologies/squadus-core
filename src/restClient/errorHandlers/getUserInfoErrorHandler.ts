/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { Errors, RestErrors } from '../constants';
import { RestClientError } from './RestClientError';
import { ErrorData } from './types';

export function getUserInfoErrorHandler(error: ErrorData): void {
    switch (error.errorType) {
        case Errors.InvalidUser:
            throw new RestClientError(Errors.InvalidName, error);
        case RestErrors.WrongArguments:
            throw new RestClientError(Errors.InvalidRequest, error);
    }
}
