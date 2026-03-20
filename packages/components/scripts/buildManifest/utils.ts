/* (c) Copyright Frontify Ltd., all rights reserved. */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function resolveFromRoot(...segments: string[]): string {
    return path.join(PACKAGE_ROOT, ...segments);
}
