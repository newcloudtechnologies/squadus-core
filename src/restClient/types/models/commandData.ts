/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export type CommandData = {
    appId?: string;
    clientOnly: boolean;
    command: string;
    description?: string;
    params?: string;
    permission?: string | string[];
    providesPreview: boolean;
};

export type GetCommandsResponse = {
    commands: CommandData[];
    count: number;
    offset: number;
    success: boolean;
    total: number;
};
