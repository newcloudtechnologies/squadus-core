export type CreatePrivateChannelRequestParams = {
    encrypted: boolean;
    members: string[];
    name: string;
    readOnly: boolean;
    teamId?: string;
};
export type CreatePublicChannelRequestParams = Omit<CreatePrivateChannelRequestParams, 'encrypted'>;
