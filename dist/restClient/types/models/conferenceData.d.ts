import { ConferenceStatus, ConferenceType, UserConferenceStatus, RoomUserRolesUppercase } from '../../../constants';
import { User } from './user';
export type ConferenceData = {
    _id: string;
    conferenceSettings: ConferenceSettings;
    createdAt: Date;
    creator: ConferenceUser;
    invitations?: Array<User>;
    lobbyStarted: boolean;
    name: string;
    number: number;
    participants: Participants;
    rid: string | null;
    serviceUrl: string;
    status: ConferenceStatus;
    type: ConferenceType;
};
export type ConferenceSettings = {
    audioMute: boolean;
    showSettingsScreen: boolean;
    videoMute: boolean;
    waitingRoomEnable: boolean;
};
export type ConferenceUser = {
    _id: string;
    guest?: boolean;
    name: string;
    username: string;
};
export type Participants = ConferenceUser & {
    invited: boolean;
    role: RoomUserRolesUppercase;
    status: UserConferenceStatus;
};
