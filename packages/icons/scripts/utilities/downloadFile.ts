/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';

export const downloadFile = async (url: string, path: string): Promise<void> => {
    const response = await fetch(url);
    // @ts-expect-error untyped
    const readableNodeStream = Readable.fromWeb(response.body);
    const fileStream = createWriteStream(path);
    return new Promise((resolve, reject) => {
        console.log(`Writing file to "${path}"...`);
        readableNodeStream.pipe(fileStream);
        readableNodeStream.on('error', reject);
        fileStream.on('finish', resolve);
    });
};
