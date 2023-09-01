"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfoErrorHandler = void 0;
const constants_1 = require("../constants");
const RestClientError_1 = require("./RestClientError");
function getUserInfoErrorHandler(error) {
    switch (error.errorType) {
        case constants_1.Errors.InvalidUser:
            throw new RestClientError_1.RestClientError(constants_1.Errors.InvalidName, error);
        case constants_1.RestErrors.WrongArguments:
            throw new RestClientError_1.RestClientError(constants_1.Errors.InvalidRequest, error);
    }
}
exports.getUserInfoErrorHandler = getUserInfoErrorHandler;
//# sourceMappingURL=getUserInfoErrorHandler.js.map