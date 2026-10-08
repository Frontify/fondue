/* (c) Copyright Frontify Ltd., all rights reserved. */

// Relative imports: `#/` resolves only for files that `tsconfig.json` includes, which `fixtures/` is not.
import { createCodecs } from '../../src/codecs';
import { doc, envelope } from '../../src/features/__fixtures__/documents';
import { type JsonValue, type RichTextDocument } from '../../src/model';
import { semanticModel } from '../reader/semantic';

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
        ids: {
            next: () => {
                next += 1;
                return `id-${next}`;
            },
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
