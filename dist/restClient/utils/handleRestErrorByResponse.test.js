"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const constants_1 = require("../constants");
const errorHandlers_1 = require("../errorHandlers");
const handleRestErrorByResponse_1 = require("./handleRestErrorByResponse");
const getAxiosResponseError = (errorType) => {
    return {
        data: {
            errorType: errorType ?? constants_1.Errors.CommonError,
            details: {},
            error: '',
            success: true,
        },
        status: constants_1.StatusCode.OK,
        statusText: 'success',
        headers: {},
        config: {},
    };
};
const getAxiosErrorWithData = (errorType) => {
    const axiosResponse = getAxiosResponseError(errorType);
    const err = new axios_1.AxiosError(undefined, errorType ?? constants_1.Errors.EmptyResult, undefined, undefined, axiosResponse);
    return { ...err, isAxiosError: true };
};
describe('handleRestErrorByResponse', () => {
    describe('isRestClientError', () => {
        it('should return true if RestClientError was passed', () => {
            const restClientErr = new errorHandlers_1.RestClientError(constants_1.Errors.CommonError, {});
            expect((0, handleRestErrorByResponse_1.isRestClientError)(restClientErr)).toBe(true);
        });
        it('should return false if AxiosError was passed', () => {
            const emptyAxiosErr = new axios_1.AxiosError();
            expect((0, handleRestErrorByResponse_1.isRestClientError)(emptyAxiosErr)).toBe(false);
        });
    });
    describe('handleSpecificMethodError', () => {
        it('should throw and error if InvalidUser error was passed', () => {
            const emptyAxiosErr = getAxiosErrorWithData(constants_1.Errors.InvalidUsername);
            expect(() => (0, handleRestErrorByResponse_1.handleSpecificMethodError)(emptyAxiosErr, errorHandlers_1.addUserToRoomErrorHandler)).toThrow();
        });
        it('should return undefined if string was passed as an error', () => {
            const emptyAxiosErr = getAxiosErrorWithData();
            expect((0, handleRestErrorByResponse_1.handleSpecificMethodError)(emptyAxiosErr, errorHandlers_1.addUserToRoomErrorHandler)).toBe(undefined);
        });
    });
    describe('handleRestErrorByResponse', () => {
        it('should throw RestClientError with CommonError code', () => {
            const restClientErr = new errorHandlers_1.RestClientError(constants_1.Errors.CommonError, {});
            try {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(restClientErr);
            }
            catch (error) {
                expect(error).toBeInstanceOf(errorHandlers_1.RestClientError);
                expect(error.code).toBe(constants_1.Errors.CommonError);
            }
        });
        it('should throw RestClientError with LostServerConnection code', () => {
            const lostConnectionAxiosErr = getAxiosErrorWithData(constants_1.RestErrors.LostConnectionErrorCode);
            try {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(lostConnectionAxiosErr);
            }
            catch (error) {
                expect(error).toBeInstanceOf(errorHandlers_1.RestClientError);
                expect(error.code).toBe(constants_1.Errors.LostServerConnection);
            }
        });
        it('should throw RestClientError with WrongServerAddress code', () => {
            const wrongShortServerAxiosErr = getAxiosErrorWithData(constants_1.RestErrors.WrongShortServer);
            try {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(wrongShortServerAxiosErr);
            }
            catch (error) {
                expect(error).toBeInstanceOf(errorHandlers_1.RestClientError);
                expect(error.code).toBe(constants_1.Errors.WrongServerAddress);
            }
        });
        it('should throw RestClientError with WrongServerAddress code', () => {
            const wrongPortAxiosErr = getAxiosErrorWithData(constants_1.RestErrors.WrongPort);
            try {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(wrongPortAxiosErr);
            }
            catch (error) {
                expect(error).toBeInstanceOf(errorHandlers_1.RestClientError);
                expect(error.code).toBe(constants_1.Errors.WrongServerAddress);
            }
        });
        it('should throw RestClientError with WrongServerAddress code', () => {
            const wrongProtocolLocalServerAxiosErr = getAxiosErrorWithData(constants_1.RestErrors.WrongProtocolLocalServer);
            try {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(wrongProtocolLocalServerAxiosErr);
            }
            catch (error) {
                expect(error).toBeInstanceOf(errorHandlers_1.RestClientError);
                expect(error.code).toBe(constants_1.Errors.WrongServerAddress);
            }
        });
        it('should throw RestClientError with TotpError code', () => {
            const restClientError = new errorHandlers_1.RestClientError(constants_1.Errors.TotpError, {});
            try {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(restClientError);
            }
            catch (error) {
                expect(error).toBeInstanceOf(errorHandlers_1.RestClientError);
                expect(error.code).toBe(constants_1.Errors.TotpError);
            }
        });
        it('should throw RestClientError with TotpError code', () => {
            const totpAxiosError = {
                response: {
                    data: constants_1.RestErrors.TotpRequired,
                },
                isAxiosError: true,
            };
            try {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(totpAxiosError);
            }
            catch (error) {
                expect(error).toBeInstanceOf(errorHandlers_1.RestClientError);
                expect(error.code).toBe(constants_1.Errors.TotpError);
            }
        });
        it('should return undefined if no error was passed', () => {
            expect((0, handleRestErrorByResponse_1.handleRestErrorByResponse)(undefined)).toBe(undefined);
        });
        it('should throw CommonError if js error was passed', () => {
            const generalError = new Error('general error');
            try {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(generalError);
            }
            catch (error) {
                expect(error).toBeInstanceOf(errorHandlers_1.RestClientError);
                expect(error.code).toBe(constants_1.Errors.CommonError);
            }
        });
        it('should throw and error if InvalidUser error was passed', () => {
            const emptyAxiosErr = getAxiosErrorWithData(constants_1.Errors.InvalidUser);
            try {
                (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(emptyAxiosErr, errorHandlers_1.addUserToRoomErrorHandler);
            }
            catch (error) {
                expect(error).toBeInstanceOf(errorHandlers_1.RestClientError);
                expect(error.code).toBe(constants_1.Errors.InvalidUser);
            }
        });
    });
});
//# sourceMappingURL=handleRestErrorByResponse.test.js.map