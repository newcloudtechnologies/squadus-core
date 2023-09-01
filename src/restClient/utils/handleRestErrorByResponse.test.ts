/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import {
    AxiosError,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';

import { Errors, RestErrors, StatusCode } from '../constants';
import {
    ErrorData,
    RestClientError,
    addUserToRoomErrorHandler,
} from '../errorHandlers';
import {
    AxiosErrorWithData,
    handleRestErrorByResponse,
    handleSpecificMethodError,
    isRestClientError,
} from './handleRestErrorByResponse';

const getAxiosResponseError = (
    errorType?: Errors | RestErrors,
): AxiosResponse<ErrorData> => {
    return {
        data: {
            errorType: errorType ?? Errors.CommonError,
            details: {},
            error: '',
            success: true,
        },
        status: StatusCode.OK,
        statusText: 'success',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
    };
};

const getAxiosErrorWithData = (
    errorType?: Errors | RestErrors,
): AxiosError<ErrorData> => {
    const axiosResponse = getAxiosResponseError(errorType);
    const err = new AxiosError(
        undefined,
        errorType ?? Errors.EmptyResult,
        undefined,
        undefined,
        axiosResponse,
    );
    return { ...err, isAxiosError: true };
};

describe('handleRestErrorByResponse', () => {
    describe('isRestClientError', () => {
        it('should return true if RestClientError was passed', () => {
            const restClientErr = new RestClientError(Errors.CommonError, {});
            expect(isRestClientError(restClientErr)).toBe(true);
        });
        it('should return false if AxiosError was passed', () => {
            const emptyAxiosErr: AxiosError<ErrorData> = new AxiosError();
            expect(isRestClientError(emptyAxiosErr)).toBe(false);
        });
    });
    describe('handleSpecificMethodError', () => {
        it('should throw and error if InvalidUser error was passed', () => {
            const emptyAxiosErr = getAxiosErrorWithData(Errors.InvalidUsername);
            expect(() =>
                handleSpecificMethodError(
                    emptyAxiosErr,
                    addUserToRoomErrorHandler,
                ),
            ).toThrow();
        });
        it('should return undefined if string was passed as an error', () => {
            const emptyAxiosErr = getAxiosErrorWithData();
            expect(
                handleSpecificMethodError(
                    emptyAxiosErr,
                    addUserToRoomErrorHandler,
                ),
            ).toBe(undefined);
        });
    });
    describe('handleRestErrorByResponse', () => {
        it('should throw RestClientError with CommonError code', () => {
            const restClientErr = new RestClientError(Errors.CommonError, {});
            try {
                handleRestErrorByResponse(restClientErr);
            } catch (error) {
                expect(error).toBeInstanceOf(RestClientError);
                expect((error as RestClientError).code).toBe(
                    Errors.CommonError,
                );
            }
        });
        it('should throw RestClientError with LostServerConnection code', () => {
            const lostConnectionAxiosErr = getAxiosErrorWithData(
                RestErrors.LostConnectionErrorCode,
            );
            try {
                handleRestErrorByResponse(lostConnectionAxiosErr);
            } catch (error) {
                expect(error).toBeInstanceOf(RestClientError);
                expect((error as RestClientError).code).toBe(
                    Errors.LostServerConnection,
                );
            }
        });
        it('should throw RestClientError with WrongServerAddress code', () => {
            const wrongShortServerAxiosErr = getAxiosErrorWithData(
                RestErrors.WrongShortServer,
            );
            try {
                handleRestErrorByResponse(wrongShortServerAxiosErr);
            } catch (error) {
                expect(error).toBeInstanceOf(RestClientError);
                expect((error as RestClientError).code).toBe(
                    Errors.WrongServerAddress,
                );
            }
        });
        it('should throw RestClientError with WrongServerAddress code', () => {
            const wrongPortAxiosErr = getAxiosErrorWithData(
                RestErrors.WrongPort,
            );
            try {
                handleRestErrorByResponse(wrongPortAxiosErr);
            } catch (error) {
                expect(error).toBeInstanceOf(RestClientError);
                expect((error as RestClientError).code).toBe(
                    Errors.WrongServerAddress,
                );
            }
        });
        it('should throw RestClientError with WrongServerAddress code', () => {
            const wrongProtocolLocalServerAxiosErr = getAxiosErrorWithData(
                RestErrors.WrongProtocolLocalServer,
            );
            try {
                handleRestErrorByResponse(wrongProtocolLocalServerAxiosErr);
            } catch (error) {
                expect(error).toBeInstanceOf(RestClientError);
                expect((error as RestClientError).code).toBe(
                    Errors.WrongServerAddress,
                );
            }
        });
        it('should throw RestClientError with TotpError code', () => {
            const restClientError = new RestClientError(Errors.TotpError, {});
            try {
                handleRestErrorByResponse(restClientError);
            } catch (error) {
                expect(error).toBeInstanceOf(RestClientError);
                expect((error as RestClientError).code).toBe(Errors.TotpError);
            }
        });
        it('should throw RestClientError with TotpError code', () => {
            const totpAxiosError = {
                response: {
                    data: RestErrors.TotpRequired,
                },
                isAxiosError: true,
            } as unknown as AxiosErrorWithData;
            try {
                handleRestErrorByResponse(totpAxiosError);
            } catch (error) {
                expect(error).toBeInstanceOf(RestClientError);
                expect((error as RestClientError).code).toBe(Errors.TotpError);
            }
        });
        it('should return undefined if no error was passed', () => {
            expect(handleRestErrorByResponse(undefined)).toBe(undefined);
        });
        it('should throw CommonError if js error was passed', () => {
            const generalError = new Error('general error');
            try {
                handleRestErrorByResponse(
                    generalError as AxiosError<ErrorData>,
                );
            } catch (error) {
                expect(error).toBeInstanceOf(RestClientError);
                expect((error as RestClientError).code).toBe(
                    Errors.CommonError,
                );
            }
        });
        it('should throw and error if InvalidUser error was passed', () => {
            const emptyAxiosErr = getAxiosErrorWithData(Errors.InvalidUser);
            try {
                handleRestErrorByResponse(
                    emptyAxiosErr,
                    addUserToRoomErrorHandler,
                );
            } catch (error) {
                expect(error).toBeInstanceOf(RestClientError);
                expect((error as RestClientError).code).toBe(
                    Errors.InvalidUser,
                );
            }
        });
    });
});
