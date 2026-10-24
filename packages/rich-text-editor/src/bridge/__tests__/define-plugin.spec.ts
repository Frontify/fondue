/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, expectTypeOf, it } from 'vitest';

import { corePlugin } from '#/features/core';
import { core } from '#/features/core/feature';
import { boldEditor } from '#/features/marks-bold/editor';
import { bold } from '#/features/marks-bold/feature';
import { mediaImageEditor } from '#/features/media-image/editor';
import { mediaImage } from '#/features/media-image/feature';
import { compileContentModel, DefinitionError, type Feature } from '#/model';
import { featureInternals } from '#/model/feature';
import { type ReaderRenderers } from '#/reader/define';

import { definePlugin, extendPlugin, modelOf, type ReaderOverrides } from '../define-plugin';
import { defineEditorPlugin, pluginWithOptions } from '../plugin';

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

describe('extendPlugin', () => {
    it('merges the given parts over the editor part and keeps the feature, the reader and the rest of the part', () => {
        const reader = { bold: () => null };
        const unit = definePlugin({ feature: bold, editor: boldEditor, reader })();
        const keys = { 'Mod-Alt-b': 'mark.bold.toggle' } as const;

        const extended = extendPlugin(unit, { keys });

        expect(extended.editor.keys).toBe(keys);
        expect(extended.editor.commands).toBe(boldEditor.commands);
        expect(extended.editor.toolbar).toBe(boldEditor.toolbar);
        expect(extended.editor.feature).toBe('marks.bold');
        expect(extended.feature).toBe(unit.feature);
        expect(extended.reader).toBe(reader);
        expect(unit.editor.keys).toBe(boldEditor.keys);
    });

    it('freezes the unit and its editor part', () => {
        const extended = extendPlugin(definePlugin({ feature: bold, editor: boldEditor })(), { keys: {} });

        expect(Object.isFrozen(extended)).toBe(true);
        expect(Object.isFrozen(extended.editor)).toBe(true);
    });

    it('merges over the parts an option-dependent editor part gives for the resolved options', () => {
        const optional = defineEditorPlugin(bold, (options) => ({
            ...boldEditor,
            inputRules: options.compact === true ? [] : (boldEditor.inputRules ?? []),
        }));
        const keys = { 'Mod-Alt-b': 'mark.bold.toggle' } as const;

        const extended = extendPlugin(definePlugin({ feature: bold, editor: optional })(), { keys });
        const resolved = pluginWithOptions(extended.editor, { compact: true });

        expect(resolved.keys).toBe(keys);
        expect(resolved.inputRules).toEqual([]);
        expect(resolved.feature).toBe('marks.bold');
        expect(pluginWithOptions(extended.editor, {}).inputRules).toBe(boldEditor.inputRules);
    });
});

describe('modelOf', () => {
    it('compiles the model that the same features give compileContentModel', () => {
        const ref = { id: 'fixture.model', version: 1 };
        const plugins = [corePlugin(), definePlugin({ feature: bold, editor: boldEditor })()] as const;

        const model = modelOf(plugins, ref);

        expect(model.fingerprint).toBe(compileContentModel([core(), bold()], ref).fingerprint);
        expect(model.ref).toEqual(ref);
    });

    it('throws what compileContentModel throws for units whose features do not fit', () => {
        const plugins = [definePlugin({ feature: bold, editor: boldEditor })()];

        expect(() => modelOf(plugins, { id: 'fixture.model', version: 1 })).toThrow(DefinitionError);
    });
});
