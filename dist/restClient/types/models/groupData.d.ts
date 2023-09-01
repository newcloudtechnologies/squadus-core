import { ChannelData } from './channelData';
export type GroupData = ChannelData & {
    broadcast?: boolean;
    encrypted?: boolean;
    teamId?: string;
    teamMain?: boolean;
};
