/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { highlight } from '#/features/__tests__/fixtures/outside-feature';
import { mountText, para, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const TAGS = [
    ['bold', 'strong'],
    ['italic', 'em'],
    ['underline', 'u'],
    ['strike', 's'],
    ['code', 'code'],
    ['subscript', 'sub'],
    ['superscript', 'sup'],
    ['fixture_highlight', 'mark'],
] as const;

describe('mark elements', () => {
    it('renders bold, italic, underline, strike, code, subscript, superscript and highlight as strong, em, u, s, code, sub, sup and mark', () => {
        const model = textModel([...textFeatures(), highlight()]);
        const { view } = mountText({
            model,
            blocks: [para(...TAGS.map(([mark, _tag], index) => text(`${mark} ${index}`, mark)))],
        });

        for (const [mark, tag] of TAGS) {
            const type = view.state.schema.marks[mark];
            if (type === undefined) {
                throw new Error(`${mark} is not in the schema.`);
            }
            const rendered = type.spec.toDOM?.(type.create(), false);
            expect(Array.isArray(rendered) ? rendered[0] : rendered).toBe(tag);
            expect(view.dom.querySelector(tag)).not.toBeNull();
        }
    });
});
