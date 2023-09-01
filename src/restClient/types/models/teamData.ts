/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { TeamType } from '../../../constants/team';

export type TeamData = {
    _id: string;
    _updatedAt: Date;
    createdAt: Date;
    createdBy: { _id: string; username: string };
    name: string;
    roomId: string;
    roomName: string;
    type: TeamType;
};

export type CreateTeamResponse = {
    success: boolean;
    team: TeamData;
};
