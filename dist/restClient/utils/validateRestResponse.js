"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRestResponse = void 0;
const errorHandlers_1 = require("../errorHandlers");
const constants_1 = require("../constants");
const validateRestResponse = (response) => {
    if (!response.data.success) {
        throw new errorHandlers_1.RestClientError(response.data.error || constants_1.Errors.CommonError, response);
    }
};
exports.validateRestResponse = validateRestResponse;
//# sourceMappingURL=validateRestResponse.js.map