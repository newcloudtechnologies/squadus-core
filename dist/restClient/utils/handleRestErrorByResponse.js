"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRestClientError = exports.handleSpecificMethodError = exports.handleRestErrorByResponse = void 0;
const constants_1 = require("../constants");
const errorHandlers_1 = require("../errorHandlers");
const typeGuards_1 = require("./typeGuards");
const handleRestErrorByResponse = (error, specificMethodErrorHandler) => {
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
            case constants_1.RestErrors.WrongShortServer:
            case constants_1.RestErrors.WrongPort:
            case constants_1.RestErrors.WrongProtocolLocalServer:
            case constants_1.RestErrors.WrongServerAddress:
                throw new errorHandlers_1.RestClientError(constants_1.Errors.WrongServerAddress, error);
            case constants_1.RestErrors.LostConnectionErrorCode:
                throw new errorHandlers_1.RestClientError(constants_1.Errors.LostServerConnection, error);
        }
        const response = error.response || {};
        const status = response.status;
        if (status === constants_1.StatusCode.Unauthorized) {
            throw new errorHandlers_1.RestClientError(constants_1.Errors.AuthorizationError, error);
        }
        const restError = response.data;
        if (
        // related to SMC-2754
        restError === constants_1.RestErrors.TotpRequired ||
            restError === constants_1.RestErrors.TotpInvalid) {
            throw new errorHandlers_1.RestClientError(constants_1.Errors.TotpError, error);
        }
        // should be very last
        if (error.code === constants_1.RestErrors.BadRequest) {
            throw new errorHandlers_1.RestClientError(constants_1.Errors.InvalidRequest, error);
        }
    }
    throw new errorHandlers_1.RestClientError(constants_1.Errors.CommonError, error);
};
exports.handleRestErrorByResponse = handleRestErrorByResponse;
function handleSpecificMethodError(error, specificMethodErrorHandler) {
    const response = error.response || {};
    const restResponse = response.data;
    if (!(0, typeGuards_1.isErrorDataString)(restResponse)) {
        specificMethodErrorHandler && specificMethodErrorHandler(restResponse);
    }
}
exports.handleSpecificMethodError = handleSpecificMethodError;
function isRestClientError(error) {
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
exports.isRestClientError = isRestClientError;
//# sourceMappingURL=handleRestErrorByResponse.js.map