/* (c) Copyright Frontify Ltd., all rights reserved. */

import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const script = fileURLToPath(new URL('render-on-server.mjs', import.meta.url));

/**
 * The editor through `renderToString` from the built package in Node, as a host renders it on the server; `blocked`
 * stores the text in an unknown format version, as `EditorHydrationProbe` does.
 */
export const renderEditorOnServer = async (text: string, blocked = false): Promise<string> => {
    // Playwright's loader caches transformed `dist/` files in a temp folder every Playwright process shares and rewrites.
    const { stdout } = await promisify(execFile)(process.execPath, [script, text, String(blocked)], {
        env: { ...process.env, NODE_OPTIONS: '' },
    });
    return stdout;
};
