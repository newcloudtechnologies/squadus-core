/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { Message } from '../../../models';

export type SendMessageByGroupNameRequestParams = {
    groupName: string;
    msg: string;
};

export type SendMessageRequestParams = {
    message: SendMessageToThreadParams | SendMessageByRidParams;
};

export type SendMessageToThreadParams = {
    msg: string;
    rid?: never;
    tmid: string;
};

export type SendMessageByRidParams = {
    msg: string;
    rid: string;
    tmid?: never;
};

export type SendMessageData = {
    message: Message;
    success: boolean;
};
