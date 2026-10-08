/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { type ContentModel } from '../../src/model';
import { RichTextReader, type RichTextReaderProps } from '../../src/reader/reader';

// A path, not a `URL`: happy-dom replaces the global `URL`, which rejects a `file:` URL.
const models = join(dirname(fileURLToPath(import.meta.url)), '..', 'model');

/** Every JSON document in `fixtures/model/<directory>`, by file name. */
export const fixturesIn = (directory: string): readonly (readonly [string, unknown])[] =>
    readdirSync(join(models, directory))
        .filter((name) => name.endsWith('.json'))
        .sort()
        .map((name) => [name, JSON.parse(readFileSync(join(models, directory, name), 'utf8')) as unknown]);

/** `RichTextReader` through `renderToString`, as a host renders published content on the server. */
export const renderReader = (
    document: unknown,
    model: ContentModel,
    props: Partial<Omit<RichTextReaderProps, 'document' | 'model'>> = {},
): string => renderToString(createElement(RichTextReader, { ...props, document, model }));

/** One element or text run per line, so a golden file diffs by tag. */
export const pretty = (html: string): string => html.replaceAll(/>(?=<)/g, '>\n');
