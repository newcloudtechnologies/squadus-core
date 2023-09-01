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
