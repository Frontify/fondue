/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, expectTypeOf, it } from 'vitest';

import { definePlugin, modelOf, type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import { compileContentModel, defineFeature, DefinitionError } from '#/model';
import { core } from '#/plugins';
import { boldPlugin } from '#/plugins/Bold';
import { boldEditor } from '#/plugins/Bold/editor';
import { bold } from '#/plugins/Bold/feature';
import { corePlugin } from '#/plugins/Core';
import { italicPlugin } from '#/plugins/Italic';
import { italic } from '#/plugins/Italic/feature';

import { pluginsOf, readersOf } from '../compile/compileEditor';
import { defineEditor } from '../compile/define';
import { type CommandsOfPlugins, type CompiledEditorDefinition } from '../types';

const model = compileContentModel([core(), bold(), italic()], { id: 'fixture.cover', version: 1 });

const failureOf = (plugins: readonly RichTextPlugin[]) => {
    try {
        defineEditor({ id: 'fixture.cover', model, plugins });
    } catch (error) {
        if (error instanceof DefinitionError) {
            return { code: error.code, details: error.details };
        }

        throw error;
    }

    return undefined;
};

describe('defineEditor with plugins', () => {
    it('installs the editor part of each plugin and the reader overrides of the plugins that have them', () => {
        const reader = { bold: () => null };
        const plugins = [corePlugin(), definePlugin({ feature: bold, editor: boldEditor, reader })(), italicPlugin()];

        const definition = defineEditor({ id: 'fixture.cover', model, plugins });

        expect(pluginsOf(definition).map(({ feature }) => feature)).toEqual(['core', 'marks.bold', 'marks.italic']);
        expect(readersOf(definition)).toEqual({ 'marks.bold': reader });
    });

    it('throws definition.missing-plugin for a model feature that has no plugin', () => {
        expect(failureOf([corePlugin(), boldPlugin()])).toEqual({
            code: 'definition.missing-plugin',
            details: { feature: 'marks.italic', path: '/plugins' },
        });
    });

    it('throws definition.orphan-behavior for a plugin whose feature the model does not install', () => {
        const small = compileContentModel([core()], { id: 'fixture.cover', version: 1 });

        expect(() =>
            defineEditor({ id: 'fixture.cover', model: small, plugins: [corePlugin(), boldPlugin()] }),
        ).toThrow(
            expect.objectContaining({
                code: 'definition.orphan-behavior',
                details: { feature: 'marks.bold', path: '/plugins/1' },
            }),
        );
    });

    it('throws definition.duplicate-id for a repeated plugin', () => {
        expect(failureOf([corePlugin(), boldPlugin(), italicPlugin(), boldPlugin()])).toEqual({
            code: 'definition.duplicate-id',
            details: { feature: 'marks.bold', path: '/plugins/3' },
        });
    });

    it('throws definition.version-mismatch, naming both versions, for a plugin of another version than the model', () => {
        const next = definePlugin({
            feature: defineFeature({ id: 'marks.bold', version: 2, requires: [{ id: 'core', version: 1 }] }),
            editor: boldEditor,
        })();

        expect(failureOf([corePlugin(), next, italicPlugin()])).toEqual({
            code: 'definition.version-mismatch',
            details: { feature: 'marks.bold', required: 1, installed: 2, path: '/plugins/1' },
        });
    });
});

describe('defineEditor types', () => {
    it('requires the plugins, so a model alone is a compile error', () => {
        // @ts-expect-error: `plugins` is required.
        const alone = () => defineEditor({ id: 'fixture.cover', model });

        expect(alone).toThrow();
    });

    it('types the commands from the plugins alone', () => {
        const plugins = [corePlugin(), boldPlugin()] as const;
        const definition = defineEditor({
            id: 'fixture.cover',
            model: modelOf(plugins, { id: 'fixture.cover', version: 1 }),
            plugins,
        });

        expectTypeOf(definition).toEqualTypeOf<CompiledEditorDefinition<CommandsOfPlugins<typeof plugins>>>();
        expectTypeOf<CommandsOfPlugins<typeof plugins>>().toHaveProperty('mark.bold.toggle');
        expectTypeOf<CommandsOfPlugins<typeof plugins>>().toHaveProperty('history.undo');
        expectTypeOf<CommandsOfPlugins<typeof plugins>>().not.toHaveProperty('mark.italic.toggle');
        expectTypeOf<CommandsOfPlugins<typeof plugins>['mark.bold.toggle']>().toEqualTypeOf<undefined>();
    });
});
