/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import method from './method.json' with { type: 'json' };

/** Where the measurements of a run go, one file per row of `budgets.json`. */
export const RESULTS = join(dirname(fileURLToPath(import.meta.url)), 'results');

/** Writes the samples of each part of a row, which the report reads. */
export const record = (id: string, parts: Readonly<Record<string, readonly number[]>>): void => {
    mkdirSync(RESULTS, { recursive: true });
    writeFileSync(join(RESULTS, `${id}.json`), JSON.stringify({ parts }));
};

/** The warm-up and sample counts every row measures with, from `method.json` alone. */
export const SETTINGS = { warmup: method.warmup, samples: method.samples } as const;
