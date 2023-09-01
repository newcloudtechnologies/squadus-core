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
