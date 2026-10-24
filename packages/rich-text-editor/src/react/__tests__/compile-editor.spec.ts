/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { definePlugin, type RichTextPlugin } from '#/bridge/define-plugin';
import { core } from '#/features';
import { corePlugin } from '#/features/core';
import { boldPlugin } from '#/features/marks-bold';
import { boldEditor } from '#/features/marks-bold/editor';
import { bold } from '#/features/marks-bold/feature';
import { italicPlugin } from '#/features/marks-italic';
import { italic } from '#/features/marks-italic/feature';
import { compileContentModel, defineFeature, DefinitionError } from '#/model';

import { compileEditor, pluginsOf, readersOf } from '../compile-editor';

const model = compileContentModel([core(), bold(), italic()], { id: 'fixture.cover', version: 1 });
const options = { id: 'fixture.cover', model };

const failureOf = (units: readonly RichTextPlugin[]) => {
    try {
        compileEditor(options, units);
    } catch (error) {
        if (error instanceof DefinitionError) {
            return { code: error.code, details: error.details };
        }
        throw error;
    }
    return undefined;
};

describe('compileEditor with units', () => {
    it('installs the editor part of each unit and the reader overrides of the units that have them', () => {
        const reader = { bold: () => null };
        const units = [corePlugin(), definePlugin({ feature: bold, editor: boldEditor, reader })(), italicPlugin()];

        const definition = compileEditor(options, units);

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

        expect(() => compileEditor({ id: 'fixture.cover', model: small }, [corePlugin(), boldPlugin()])).toThrow(
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
