/* (c) Copyright Frontify Ltd., all rights reserved. */

import chalk from 'chalk';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function log(message: string): void {
    console.log(chalk.blue('[manifest]'), message);
}

export function logSuccess(message: string): void {
    console.log(chalk.green('[manifest]'), message);
}

export function logWarn(message: string): void {
    console.warn(chalk.yellow('[manifest]'), message);
}

export function logError(message: string): void {
    console.error(chalk.red('[manifest]'), message);
}

export function resolveFromRoot(...segments: string[]): string {
    return path.join(PACKAGE_ROOT, ...segments);
}
