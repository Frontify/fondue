/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { boldEditor } from '#/plugins/Bold/editor';
import { codeEditor } from '#/plugins/Code/editor';
import { italicEditor } from '#/plugins/Italic/editor';
import { strikeEditor } from '#/plugins/Strikethrough/editor';
import { subscriptEditor } from '#/plugins/Subscript/editor';
import { superscriptEditor } from '#/plugins/Superscript/editor';
import { underlineEditor } from '#/plugins/Underline/editor';

import { toggleMark } from '../pluginApi/define';
import { type EditorPart } from '../pluginApi/plugin';

const anyFunction: unknown = expect.any(Function);
const command = { run: anyFunction, active: anyFunction };

const delimiter = (id: string, mark: string, text: string) => ({
    id,
    kind: 'mark-delimiter',
    open: text,
    close: text,
    mark,
});

const entry = (mark: string, labelKey: string, icon: string) => ({
    id: mark,
    kind: 'toggle',
    command: `mark.${mark}.toggle`,
    labelKey,
    icon,
});

const shape = (part: EditorPart) => {
    const { commands = {}, keys = {}, inputRules = [], toolbar = [] } = part;

    return {
        commands: Object.keys(commands),
        keys,
        inputRules: inputRules.map(({ id }) => id),
        toolbar: toolbar.map(({ id, command: toolbarCommand }) => `${id}:${toolbarCommand}`),
    };
};

describe('toggleMark', () => {
    it('builds the part the explicit definition built for bold', () => {
        expect(boldEditor).toEqual({
            feature: 'marks.bold',
            needs: ['marks'],
            commands: { 'mark.bold.toggle': command },
            keys: { 'Mod-b': 'mark.bold.toggle' },
            inputRules: [delimiter('bold.stars', 'bold', '**'), delimiter('bold.underscores', 'bold', '__')],
            toolbar: [{ ...entry('bold', 'RichTextEditor_bold', 'IconTextFormatBold'), bubble: true }],
        });
        expect(Object.isFrozen(boldEditor)).toBe(true);
    });

    it('builds the part the explicit definition built for subscript', () => {
        expect(subscriptEditor).toEqual({
            feature: 'marks.subscript',
            needs: ['marks'],
            commands: { 'mark.subscript.toggle': command },
            keys: { 'Mod-,': 'mark.subscript.toggle' },
            toolbar: [entry('subscript', 'RichTextEditor_subscript', 'IconSubscript')],
        });
    });

    it('builds the commands, keys, rules and toolbar of the other marks', () => {
        expect(shape(italicEditor)).toEqual({
            commands: ['mark.italic.toggle'],
            keys: { 'Mod-i': 'mark.italic.toggle' },
            inputRules: ['italic.star', 'italic.underscore'],
            toolbar: ['italic:mark.italic.toggle'],
        });
        expect(shape(underlineEditor)).toEqual({
            commands: ['mark.underline.toggle'],
            keys: { 'Mod-u': 'mark.underline.toggle' },
            inputRules: [],
            toolbar: ['underline:mark.underline.toggle'],
        });
        expect(shape(strikeEditor)).toEqual({
            commands: ['mark.strike.toggle'],
            keys: { 'Mod-Shift-x': 'mark.strike.toggle' },
            inputRules: ['strike.tildes'],
            toolbar: ['strike:mark.strike.toggle'],
        });
        expect(shape(codeEditor)).toEqual({
            commands: ['mark.code.toggle'],
            keys: { 'Mod-e': 'mark.code.toggle' },
            inputRules: ['code.backtick'],
            toolbar: ['code:mark.code.toggle'],
        });
        expect(shape(superscriptEditor)).toEqual({
            commands: ['mark.superscript.toggle'],
            keys: { 'Mod-.': 'mark.superscript.toggle' },
            inputRules: [],
            toolbar: ['superscript:mark.superscript.toggle'],
        });
    });

    it('defaults the command, the toolbar ID and the rule IDs', () => {
        const part = toggleMark({
            mark: 'bold',
            keys: ['Mod-b', 'Mod-Shift-b'],
            inputRules: [
                { open: '*', close: '*' },
                { open: '+', close: '+', id: 'plus' },
            ],
            toolbar: { labelKey: 'k', icon: 'IconX' },
        });

        expect(part.keys).toEqual({ 'Mod-b': 'mark.bold.toggle', 'Mod-Shift-b': 'mark.bold.toggle' });
        expect(part.inputRules?.map(({ id }) => id)).toEqual(['bold.1', 'plus']);
        expect(part.toolbar).toEqual([
            { id: 'bold', kind: 'toggle', command: 'mark.bold.toggle', labelKey: 'k', icon: 'IconX' },
        ]);
    });
});
