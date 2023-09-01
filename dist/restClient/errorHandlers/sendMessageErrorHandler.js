"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageErrorHandler = void 0;
const constants_1 = require("../constants");
const RestClientError_1 = require("./RestClientError");
function sendMessageErrorHandler(error) {
    if (error.errorType === constants_1.Errors.MessageSizeExceeded) {
        throw new RestClientError_1.RestClientError(constants_1.Errors.MessageSizeExceeded, error);
    }
    if (error.errorType === constants_1.Errors.RateLimit) {
        throw new RestClientError_1.RestClientError(constants_1.Errors.RateLimit, error);
    }
    /*
     * error.error is not a mistake!!!
     * server returns Error with field named `error` only in `sendMessageByRid`
     * in all other requests we receive `Error` like `error.errorType`
     */
    if (error.error === constants_1.Errors.InvalidRoom) {
        throw new RestClientError_1.RestClientError(constants_1.Errors.InvalidRoom, error);
    }
}
exports.sendMessageErrorHandler = sendMessageErrorHandler;
//# sourceMappingURL=sendMessageErrorHandler.js.map