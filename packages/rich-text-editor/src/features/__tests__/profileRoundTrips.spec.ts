/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { canonicalOf, documentArb, fcSettings, seeded } from '#/features/__tests__/fixtures/generated';
import { type ContentModel, type ContentNodeJSON, type RichTextDocument } from '#/model';
import { PROFILE_MODELS } from '#/react/examples/records';
import { buildSchema } from '#/runtime/definition/schema';

/** Leaves out attributes at their default, reverses marks, splits texts and writes empty `content` and `marks`. */
const denormalized = (model: ContentModel, document: RichTextDocument): RichTextDocument => {
    const schema = buildSchema(model);
    const visit = (node: ContentNodeJSON): ContentNodeJSON => {
        const copy: Record<string, unknown> = { ...node };
        const specAttrs = schema.nodes[node.type]?.spec.attrs;
        const declared = specAttrs ?? {};
        if (node.attrs !== undefined) {
            const attrs: Record<string, unknown> = {};
            for (const [name, value] of Object.entries(node.attrs)) {
                const spec = declared[name];
                const atDefault =
                    spec !== undefined && 'default' in spec && JSON.stringify(spec.default) === JSON.stringify(value);
                if (!atDefault) {
                    attrs[name] = value;
                }
            }

            copy.attrs = attrs;
        }

        if (node.marks !== undefined) {
            copy.marks = [...node.marks].reverse();
        } else if (node.type === 'text') {
            copy.marks = [];
        }

        if (node.content === undefined) {
            if (node.type !== 'text') {
                copy.content = [];
            }

            return copy as unknown as ContentNodeJSON;
        }

        copy.content = node.content.flatMap((child) => {
            const written = visit(child);
            const characters = [...(child.text ?? '')];
            if (child.type !== 'text' || characters.length < 2) {
                return [written];
            }

            return [
                { ...written, text: characters[0] ?? '' },
                { ...written, text: characters.slice(1).join('') },
            ];
        });

        return copy as unknown as ContentNodeJSON;
    };

    return { ...document, content: visit(document.content) } as RichTextDocument;
};

/**
 * Where `document` departs from the canonical form: a declared attribute left out, an empty `content` or `marks`, or
 * adjacent texts with equal marks.
 */
const canonicalProblems = (model: ContentModel, document: RichTextDocument | undefined): string[] => {
    if (document === undefined) {
        return ['the document does not decode'];
    }

    const schema = buildSchema(model);
    const problems: string[] = [];
    const visit = (node: ContentNodeJSON, path: string) => {
        if (node.type !== 'text') {
            // The engine schema holds `unknownAttributes` for attributes no feature declares, which stay unwritten.
            const specAttrs = schema.nodes[node.type]?.spec.attrs;
            const declared = Object.keys(specAttrs ?? {}).filter((name) => name !== 'unknownAttributes');
            const missing = declared.filter((name) => !Object.hasOwn(node.attrs ?? {}, name));
            if (missing.length > 0) {
                problems.push(`${path} ${node.type} leaves out ${missing.join(', ')}`);
            }
        }

        if (node.content?.length === 0) {
            problems.push(`${path} ${node.type} has an empty content`);
        }

        if (node.marks?.length === 0) {
            problems.push(`${path} has empty marks`);
        }

        for (const [index, child] of (node.content ?? []).entries()) {
            const previous = node.content?.[index - 1];
            const previousMarks = previous?.marks;
            const childMarks = child.marks ?? [];
            const sameMarks = JSON.stringify(previousMarks ?? []) === JSON.stringify(childMarks);
            if (child.type === 'text' && previous?.type === 'text' && sameMarks) {
                problems.push(`${path}/${index} joins no adjacent text with equal marks`);
            }

            visit(child, `${path}/${index}`);
        }
    };

    visit(document.content, '');

    return problems;
};

describe(seeded('decode and encode of generated documents'), () => {
    it.each(Object.entries(PROFILE_MODELS))(
        'writes each generated %s document back in canonical form, from its canonical and its loose form',
        (_name, model) => {
            fc.assert(
                fc.property(documentArb(model), (document) => {
                    const written = canonicalOf(model, denormalized(model, document));

                    expect(canonicalProblems(model, written)).toEqual([]);
                    expect(canonicalOf(model, document)?.content).toEqual(document.content);
                    expect(written?.content).toEqual(document.content);
                }),
                fcSettings(100),
            );
        },
    );
});
