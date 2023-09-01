"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const validateRestResponse_1 = require("./validateRestResponse");
const constants_1 = require("../constants");
const getAxiosResponseWithErrorData = (isSuccess = true) => {
    return {
        data: {
            details: {},
            error: '',
            errorType: '',
            success: isSuccess,
        },
        status: constants_1.StatusCode.OK,
        statusText: 'success',
        headers: {},
        // @ts-expect-error
        config: {},
    };
};
describe('validateRestResponse', () => {
    it('should not throw an error when SUCCESS is true', () => {
        const response = getAxiosResponseWithErrorData();
        expect((0, validateRestResponse_1.validateRestResponse)(response)).toBe(undefined);
    });
    it('should throw an error when SUCCESS is false', () => {
        const response = getAxiosResponseWithErrorData(false);
        expect(() => (0, validateRestResponse_1.validateRestResponse)(response)).toThrow();
    });
});
//# sourceMappingURL=validateRestResponse.test.js.map