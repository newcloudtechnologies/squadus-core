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
