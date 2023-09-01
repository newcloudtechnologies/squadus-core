"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.callMeteorRequest = exports.parseMeteorRequestArguments = exports.handleMeteorResponse = void 0;
const constants_1 = require("../constants");
const errorHandlers_1 = require("../errorHandlers");
const handleRestErrorByResponse_1 = require("./handleRestErrorByResponse");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleMeteorResponse = (response) => {
    const message = JSON.parse(response.data.message);
    const error = message.error;
    if (response.data.success && !error) {
        return message.result;
    }
    else {
        const code = error.error || constants_1.Errors.CommonError;
        const restError = error || response;
        throw new errorHandlers_1.RestClientError(code, restError);
    }
};
exports.handleMeteorResponse = handleMeteorResponse;
const parseMeteorRequestArguments = ({ method, params = [], }) => {
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
exports.parseMeteorRequestArguments = parseMeteorRequestArguments;
const callMeteorRequest = async ({ httpClient, method, params = [] }, specificMethodErrorHandler) => {
    const { url, data } = (0, exports.parseMeteorRequestArguments)({ method, params });
    return await httpClient
        .post(url, data)
        .then((response) => (0, exports.handleMeteorResponse)(response))
        .catch((error) => (0, handleRestErrorByResponse_1.handleRestErrorByResponse)(error, specificMethodErrorHandler));
};
exports.callMeteorRequest = callMeteorRequest;
//# sourceMappingURL=callMeteorRequest.js.map