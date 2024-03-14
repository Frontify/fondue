/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync } from 'node:fs';
import { extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getFileInDirectoryByExtension = (directory: string, fileExtension: string, recursive = true) => {
    return readdirSync(directory, { recursive }).filter(
        (file) => typeof file === 'string' && extname(file) === fileExtension,
    );
};

export const getCurrentDirPath = (currentPath: string) => dirname(fileURLToPath(currentPath));
