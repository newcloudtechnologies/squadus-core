"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserToRoomErrorHandler = void 0;
const constants_1 = require("../constants");
const RestClientError_1 = require("./RestClientError");
function addUserToRoomErrorHandler(error) {
    switch (error.errorType) {
        case constants_1.Errors.InvalidUsername:
            throw new RestClientError_1.RestClientError(constants_1.Errors.InvalidUsername, error);
        case constants_1.Errors.InvalidUser:
            throw new RestClientError_1.RestClientError(constants_1.Errors.InvalidUser, error);
        case constants_1.Errors.CantInviteForDirectRoom:
            throw new RestClientError_1.RestClientError(constants_1.Errors.CantInviteForDirectRoom, error);
    }
}
exports.addUserToRoomErrorHandler = addUserToRoomErrorHandler;
//# sourceMappingURL=addUserToRoomErrorHandler.js.map