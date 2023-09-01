/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { isErrorDataString } from './typeGuards';

describe('typeGuards', () => {
    describe('isErrorDataString', () => {
        it('should return true if string is passed', () => {
            const str = 'str';
            expect(isErrorDataString(str)).toBe(true);
        });
        it('should return false if boolean is passed', () => {
            const bool = false;
            // @ts-expect-error passed wrong type on purpose
            expect(isErrorDataString(bool)).toBe(false);
        });
        it('should return false if object is passed', () => {
            const obj = {};
            // @ts-expect-error passed wrong type on purpose
            expect(isErrorDataString(obj)).toBe(false);
        });
    });
});
