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

export function sendMessageErrorHandler(error: ErrorData): void {
    if (error.errorType === Errors.MessageSizeExceeded) {
        throw new RestClientError(Errors.MessageSizeExceeded, error);
    }
    if (error.errorType === Errors.RateLimit) {
        throw new RestClientError(Errors.RateLimit, error);
    }
    /*
     * error.error is not a mistake!!!
     * server returns Error with field named `error` only in `sendMessageByRid`
     * in all other requests we receive `Error` like `error.errorType`
     */
    if (error.error === Errors.InvalidRoom) {
        throw new RestClientError(Errors.InvalidRoom, error);
    }
}
