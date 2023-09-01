import { TeamType } from '../../../constants/team';
export type TeamData = {
    _id: string;
    _updatedAt: Date;
    createdAt: Date;
    createdBy: {
        _id: string;
        username: string;
    };
    name: string;
    roomId: string;
    roomName: string;
    type: TeamType;
};
export type CreateTeamResponse = {
    success: boolean;
    team: TeamData;
};
