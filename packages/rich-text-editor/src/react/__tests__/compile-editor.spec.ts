/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, expectTypeOf, it } from 'vitest';

import { definePlugin, modelOf, type RichTextPlugin } from '#/bridge/define-plugin';
import { core } from '#/features';
import { corePlugin } from '#/features/core';
import { boldPlugin } from '#/features/marks-bold';
import { boldEditor } from '#/features/marks-bold/editor';
import { bold } from '#/features/marks-bold/feature';
import { italicPlugin } from '#/features/marks-italic';
import { italic } from '#/features/marks-italic/feature';
import { compileContentModel, defineFeature, DefinitionError } from '#/model';

import { pluginsOf, readersOf } from '../compile-editor';
import { defineEditor } from '../define';
import { type CommandsOfPlugins, type CompiledEditorDefinition } from '../types';

const model = compileContentModel([core(), bold(), italic()], { id: 'fixture.cover', version: 1 });

const failureOf = (units: readonly RichTextPlugin[]) => {
    try {
        defineEditor({ id: 'fixture.cover', model, plugins: units });
    } catch (error) {
        if (error instanceof DefinitionError) {
            return { code: error.code, details: error.details };
        }
        throw error;
    }
    return undefined;
};

describe('defineEditor with units', () => {
    it('installs the editor part of each unit and the reader overrides of the units that have them', () => {
        const reader = { bold: () => null };
        const units = [corePlugin(), definePlugin({ feature: bold, editor: boldEditor, reader })(), italicPlugin()];

        const definition = defineEditor({ id: 'fixture.cover', model, plugins: units });

        expect(pluginsOf(definition).map(({ feature }) => feature)).toEqual(['core', 'marks.bold', 'marks.italic']);
        expect(readersOf(definition)).toEqual({ 'marks.bold': reader });
    });

    it('throws definition.missing-plugin for a model feature that has no unit', () => {
        expect(failureOf([corePlugin(), boldPlugin()])).toEqual({
            code: 'definition.missing-plugin',
            details: { feature: 'marks.italic', path: '/plugins' },
        });
    });

    it('throws definition.orphan-behavior for a unit whose feature the model does not install', () => {
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

    it('throws definition.duplicate-id for a repeated unit', () => {
        expect(failureOf([corePlugin(), boldPlugin(), italicPlugin(), boldPlugin()])).toEqual({
            code: 'definition.duplicate-id',
            details: { feature: 'marks.bold', path: '/plugins/3' },
        });
    });

    it('throws definition.version-mismatch, naming both versions, for a unit of another version than the model', () => {
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

    it('types the commands from the units alone', () => {
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
