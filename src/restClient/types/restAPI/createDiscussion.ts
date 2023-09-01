/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export type CreateDiscussionRequestParams = {
    // Message id
    pmid: string;
    // Room id
    prid: string;
    reply: string;
    // Title
    t_name: string;
    // User ids
    users: string[];
};
