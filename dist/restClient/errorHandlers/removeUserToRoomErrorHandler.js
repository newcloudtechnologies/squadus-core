"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserFromRoomErrorHandler = void 0;
const constants_1 = require("../constants");
const RestClientError_1 = require("./RestClientError");
function removeUserFromRoomErrorHandler(error) {
    if (error.errorType === constants_1.Errors.RoomNotFound) {
        throw new RestClientError_1.RestClientError(constants_1.Errors.RoomNotFound, error);
    }
}
exports.removeUserFromRoomErrorHandler = removeUserFromRoomErrorHandler;
//# sourceMappingURL=removeUserToRoomErrorHandler.js.map