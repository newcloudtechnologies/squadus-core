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
