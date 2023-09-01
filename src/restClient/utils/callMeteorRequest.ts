/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { type AxiosResponse } from 'axios';

import { Errors } from '../constants';
import { RestClientError } from '../errorHandlers';
import { CallMeteorRequest, MeteorRequestData } from '../types';
import {
    AxiosErrorWithData,
    handleRestErrorByResponse,
} from './handleRestErrorByResponse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMeteorResponse = (response: any) => {
    const message = JSON.parse(response.data.message);
    const error = message.error;
    if (response.data.success && !error) {
        return message.result;
    } else {
        const code = error.error || Errors.CommonError;
        const restError = error || response;
        throw new RestClientError(code, restError);
    }
};

export const parseMeteorRequestArguments = ({
    method,
    params = [],
}: MeteorRequestData): {
    data: {
        message: string;
    };
    url: string;
} => {
    const url = `method.call/${method}`;
    const data = {
        message: JSON.stringify({
            method,
            params,
        }),
    };
    const args = { url, data };
    return args;
};

export const callMeteorRequest: CallMeteorRequest = async (
    { httpClient, method, params = [] },
    specificMethodErrorHandler,
) => {
    const { url, data } = parseMeteorRequestArguments({ method, params });
    return await httpClient
        .post(url, data)
        .then((response: any) => handleMeteorResponse(response))
        .catch((error: AxiosErrorWithData | AxiosResponse) =>
            handleRestErrorByResponse(error, specificMethodErrorHandler),
        );
};
