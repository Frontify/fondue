/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { defineEditor, defineEditorPlugin } from '#/index';
import { compileContentModel, DefinitionError } from '#/model';

describe('a host part for a feature the package ships', () => {
    const boldModel = compileContentModel([core(), bold()], { id: 'fixture.bold', version: 1 });

    const strong = defineEditorPlugin(bold, {
        commands: { 'mark.bold.count': { run: () => true } },
        toolbar: [
            {
                id: 'bold',
                kind: 'toggle',
                command: 'mark.bold.toggle',
                label: { 'en-US': 'Strong' },
                icon: 'IconTextFormatBold',
            },
        ],
    });

    it('refuses two host parts for one feature', () => {
        expect(() => defineEditor({ id: 'fixture.bold', model: boldModel, plugins: [strong, strong] })).toThrow(
            DefinitionError,
        );
    });
});
