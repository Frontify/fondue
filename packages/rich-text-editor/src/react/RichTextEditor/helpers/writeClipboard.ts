/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Writes `plain` and `html` as one clipboard item, or `plain` alone where the browser has no `ClipboardItem`;
 * `false` when nothing was copied, as on a page with no clipboard access.
 */
export const writeClipboard = async (plain: string, html?: string): Promise<boolean> => {
    const clipboard = navigator.clipboard as Clipboard | undefined;
    if (clipboard === undefined) {
        return false;
    }

    try {
        if (html === undefined || typeof ClipboardItem !== 'function') {
            await clipboard.writeText(plain);

            return true;
        }

        const item = new ClipboardItem({
            'text/plain': new Blob([plain], { type: 'text/plain' }),
            'text/html': new Blob([html], { type: 'text/html' }),
        });
        await clipboard.write([item]);

        return true;
    } catch {
        return false;
    }
};
