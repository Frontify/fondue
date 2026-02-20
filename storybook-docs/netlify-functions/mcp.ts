/* (c) Copyright Frontify Ltd., all rights reserved. */

import { basename } from 'node:path';

import { createStorybookMcpHandler } from '@storybook/mcp';

const MANIFESTS_BASE = 'https://fondue-components.netlify.app/manifests';

const handler = await createStorybookMcpHandler({
    manifestProvider: async (_request: Request | undefined, path: string): Promise<string> => {
        const url = `${MANIFESTS_BASE}/${basename(path)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.status}`);
        }
        return await response.text();
    },
});

export default async (req: Request): Promise<Response> => {
    return await handler(req);
};

export const config = {
    path: '/mcp',
    preferStatic: true,
};
