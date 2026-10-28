/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { RichTextReader, type RichTextReaderProps } from '#/entries/reader';
import { type ContentModel } from '#/model';

// A path, not a `URL`: happy-dom replaces the global `URL`, which rejects a `file:` URL.
const models = join(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..',
    'model',
    '__tests__',
    'fixtures',
    'model',
);

/** Every JSON document in a model fixture directory, by file name. */
export const fixturesIn = (directory: string): readonly (readonly [string, unknown])[] => {
    const directoryPath = join(models, directory);
    const names = readdirSync(directoryPath).filter((name) => name.endsWith('.json'));
    names.sort();
    const fixtures: (readonly [string, unknown])[] = [];
    for (const name of names) {
        const contents = readFileSync(join(directoryPath, name), 'utf8');
        fixtures.push([name, JSON.parse(contents) as unknown]);
    }

    return fixtures;
};

/** `RichTextReader` through `renderToString`, as a host renders published content on the server. */
export const renderReader = (
    document: unknown,
    model: ContentModel,
    props: Partial<Omit<RichTextReaderProps, 'document' | 'model'>> = {},
): string => renderToString(createElement(RichTextReader, { ...props, document, model }));

/** One element or text run per line, so a golden file diffs by tag. */
export const pretty = (html: string): string => html.replaceAll(/>(?=<)/g, '>\n');
