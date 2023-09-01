"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRoleErrorHandler = void 0;
const constants_1 = require("../constants");
const RestClientError_1 = require("./RestClientError");
function setUserRoleErrorHandler(error) {
    switch (error.errorType) {
        case constants_1.Errors.InvalidUser:
            throw new RestClientError_1.RestClientError(constants_1.Errors.InvalidUser, error);
        case constants_1.Errors.UserAlreadyModerator:
            throw new RestClientError_1.RestClientError(constants_1.Errors.UserAlreadyModerator, error);
        case constants_1.Errors.UserNotModerator:
            throw new RestClientError_1.RestClientError(constants_1.Errors.UserNotModerator, error);
        case constants_1.Errors.UserAlreadyOwner:
            throw new RestClientError_1.RestClientError(constants_1.Errors.UserAlreadyOwner, error);
        case constants_1.Errors.UserNotOwner:
            throw new RestClientError_1.RestClientError(constants_1.Errors.UserNotOwner, error);
        case constants_1.Errors.UserAlreadyLeader:
            throw new RestClientError_1.RestClientError(constants_1.Errors.UserAlreadyLeader, error);
        case constants_1.Errors.UserNotLeader:
            throw new RestClientError_1.RestClientError(constants_1.Errors.UserNotLeader, error);
        case constants_1.Errors.UserNotInRoom:
            throw new RestClientError_1.RestClientError(constants_1.Errors.UserNotInRoom, error);
    }
}
exports.setUserRoleErrorHandler = setUserRoleErrorHandler;
//# sourceMappingURL=setUserRoleErrorHandler.js.map