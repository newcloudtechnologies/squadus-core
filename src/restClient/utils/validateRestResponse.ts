/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { RestClientError } from '../errorHandlers';
import { Errors } from '../constants';

import type { AxiosResponse } from 'axios';
export const validateRestResponse = (
    response: AxiosResponse<any, any>,
): void => {
    if (!response.data.success) {
        throw new RestClientError(
            response.data.error || Errors.CommonError,
            response,
        );
    }
};
