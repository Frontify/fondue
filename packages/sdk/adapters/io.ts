/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Minimal stdio helpers shared by the `fondue` CLI and every adapter.
 * Centralised so the `fondue:` error prefix and exit semantics stay consistent.
 */

export const log = (message: string): void => {
    process.stdout.write(`${message}\n`);
};

export const fail = (message: string, code = 1): never => {
    process.stderr.write(`fondue: ${message}\n`);
    process.exit(code);
};
