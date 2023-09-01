/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { AxiosError, type AxiosResponse } from 'axios';

import { Errors, RestErrors, StatusCode } from '../constants';
import { ErrorData, RestClientError } from '../errorHandlers';
import { isErrorDataString } from './typeGuards';

type AxiosErrorResponseData = string | ErrorData;
export type AxiosErrorResponse = AxiosResponse<AxiosErrorResponseData>;
export type AxiosErrorWithData = AxiosError<AxiosErrorResponseData>;

export const handleRestErrorByResponse = (
    error?: AxiosErrorWithData | AxiosResponse | RestClientError,
    specificMethodErrorHandler?: (error: ErrorData) => void,
): never | void => {
    if (!error) {
        console.warn('RestClient processRestError() called without argument');
        return;
    }
    const isErrTypeofRestClientError = isRestClientError(error);
    // skip already formatted errors
    if (isErrTypeofRestClientError) {
        throw error;
    }
    const isAxiosError = 'isAxiosError' in error;
    if (isAxiosError) {
        if (specificMethodErrorHandler) {
            handleSpecificMethodError(error, specificMethodErrorHandler);
        }

        switch (error.code) {
            case RestErrors.WrongShortServer:
            case RestErrors.WrongPort:
            case RestErrors.WrongProtocolLocalServer:
            case RestErrors.WrongServerAddress:
                throw new RestClientError(Errors.WrongServerAddress, error);
            case RestErrors.LostConnectionErrorCode:
                throw new RestClientError(Errors.LostServerConnection, error);
        }

        const response = error.response || ({} as AxiosErrorResponse);
        const status = response.status;
        if (status === StatusCode.Unauthorized) {
            throw new RestClientError(Errors.AuthorizationError, error);
        }
        const restError = response.data as AxiosErrorResponseData;
        if (
            // related to SMC-2754
            restError === RestErrors.TotpRequired ||
            restError === RestErrors.TotpInvalid
        ) {
            throw new RestClientError(Errors.TotpError, error);
        }

        // should be very last
        if (error.code === RestErrors.BadRequest) {
            throw new RestClientError(Errors.InvalidRequest, error);
        }
    }
    throw new RestClientError(Errors.CommonError, error);
};

export function handleSpecificMethodError(
    error: AxiosErrorWithData,
    specificMethodErrorHandler?: (error: ErrorData) => void,
): void | never {
    const response = error.response || ({} as AxiosErrorResponse);
    const restResponse = response.data;
    if (!isErrorDataString(restResponse)) {
        specificMethodErrorHandler && specificMethodErrorHandler(restResponse);
    }
}

export function isRestClientError(
    error: AxiosErrorWithData | AxiosResponse | RestClientError,
): boolean {
    const isAmountOfKeysFit = Object.keys(error).length == 2;
    if (!isAmountOfKeysFit) {
        return false;
    }
    const hasCode = 'code' in error;
    if (!hasCode) {
        return false;
    }
    const hasError = 'error' in error;
    if (!hasError) {
        return false;
    }
    return true;
}
