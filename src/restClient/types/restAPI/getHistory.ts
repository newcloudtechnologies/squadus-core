/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { Message } from '../../../models';

export type GetHistoryData = {
    message: {
        msg: string;
        result: Array<Message>;
        unreadNotLoaded: number;
    };
    success: boolean;
};

export type GetHistoryRequestParams = {
    end: number;
    limit: number;
    ls: Date;
    rid: string;
    showThreadMessages: boolean;
};
