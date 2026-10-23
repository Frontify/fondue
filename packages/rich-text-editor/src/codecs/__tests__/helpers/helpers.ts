/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createCodecs } from '#/codecs';
import { doc, envelope } from '#/features/__tests__/fixtures/documents';
import { type JsonValue, type RichTextDocument } from '#/model';
import { semanticModel } from '#/reader/__tests__/fixtures/semantic';

/** Every stand-in feature, so a test document may use any of them without a capability warning. */
const CAPABILITIES = [
    'core',
    'fixture.align',
    'fixture.blocks',
    'fixture.colors',
    'fixture.indent',
    'fixture.link',
    'fixture.lists',
    'fixture.marks',
    'fixture.media',
    'fixture.mention',
    'fixture.styles',
    'fixture.tables',
];

/** A stored document of the semantic stand-ins holding `blocks`. */
export const stored = (...blocks: readonly JsonValue[]): RichTextDocument =>
    envelope(doc(...blocks), CAPABILITIES) as unknown as RichTextDocument;

let next = 0;
/** Codecs over the semantic stand-ins, with `nodeId`s numbered in creation order. */
export const semanticCodecs = () => {
    next = 0;
    return createCodecs(semanticModel(), {
        generateId: () => {
            next += 1;
            return `id-${next}`;
        },
    });
};

/** A stored document with every `nodeId` replaced, so two documents compare by content alone. */
export const withoutIds = (document: unknown): unknown =>
    JSON.parse(
        JSON.stringify(document, (key, value: unknown) => {
            if (key === 'nodeId') {
                return 'id';
            }
            return value;
        }),
    );
