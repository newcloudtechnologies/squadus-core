/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export type SccCallStartData = {
    message: {
        msg: string;
    };
    success: boolean;
};

export type SccCallStartRequestParams = {
    all: boolean;
    conferenceNumber: string;
    notify: boolean;
    rid: string;
};
