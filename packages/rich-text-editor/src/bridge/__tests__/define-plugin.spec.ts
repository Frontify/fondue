/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, expectTypeOf, it } from 'vitest';

import { boldEditor } from '#/features/marks-bold/editor';
import { bold } from '#/features/marks-bold/feature';
import { mediaImageEditor } from '#/features/media-image/editor';
import { mediaImage } from '#/features/media-image/feature';
import { DefinitionError, type Feature } from '#/model';
import { featureInternals } from '#/model/feature';
import { type ReaderRenderers } from '#/reader/define';

import { definePlugin, type ReaderOverrides } from '../define-plugin';

describe('definePlugin', () => {
    it('bundles a shipped feature with its editor part', () => {
        const plugin = definePlugin({ feature: bold, editor: boldEditor })();

        expect(plugin.id).toBe('marks.bold');
        expect(plugin.feature.id).toBe('marks.bold');
        expect(plugin.editor.feature).toBe('marks.bold');
        expect(plugin.editor).toBe(boldEditor);
        expect(plugin.reader).toBeUndefined();
    });

    it('calls the feature factory with the options it was given', () => {
        const plugin = definePlugin({ feature: mediaImage, editor: mediaImageEditor })({
            acceptTypes: ['image/png'],
        });

        expect(featureInternals(plugin.feature)?.options).toEqual({ acceptTypes: ['image/png'] });
        expect(
            featureInternals(definePlugin({ feature: mediaImage, editor: mediaImageEditor })().feature)?.options,
        ).toBeUndefined();
    });

    it('carries the reader overrides', () => {
        const reader = { bold: () => null };
        const plugin = definePlugin({ feature: bold, editor: boldEditor, reader })();

        expect(plugin.reader).toBe(reader);
    });

    it('throws when the editor part belongs to another feature', () => {
        const widenedBold = (): Feature<object, object, object, string> => bold();
        const mismatched = () => definePlugin({ feature: widenedBold, editor: mediaImageEditor });

        expect(mismatched).toThrow(DefinitionError);
        expect(mismatched).toThrow(expect.objectContaining({ code: 'definition.plugin-mismatch' }));
    });

    it('freezes the unit and keeps it whole through a spread copy', () => {
        const plugin = definePlugin({ feature: bold, editor: boldEditor })();
        const copy = { ...plugin };

        expect(Object.isFrozen(plugin)).toBe(true);
        expect(copy.editor).toBe(plugin.editor);
        expect(copy.feature.id).toBe(plugin.feature.id);
    });

    it('types the ID as the literal feature ID and keeps the command types', () => {
        const plugin = definePlugin({ feature: bold, editor: boldEditor })();

        expectTypeOf(plugin.id).toEqualTypeOf<'marks.bold'>();
        expectTypeOf(plugin.editor.feature).toEqualTypeOf<'marks.bold'>();
        expectTypeOf(plugin.editor).toEqualTypeOf(boldEditor);
    });

    it('rejects an editor part of another feature at compile time', () => {
        // @ts-expect-error the feature fixes the ID, so the media image editor part does not fit
        const mismatched = () => definePlugin({ feature: bold, editor: mediaImageEditor });

        expect(mismatched).toThrow(DefinitionError);
    });

    it('keeps the local reader overrides type equal to the reader renderers type', () => {
        expectTypeOf<ReaderOverrides>().toEqualTypeOf<ReaderRenderers>();
    });
});
