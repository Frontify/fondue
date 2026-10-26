/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { describe, expect, it } from 'vitest';

import { defineEditorPart } from '#/bridge/pluginApi/plugin';
import { compileContentModel, defineFeature, type JsonValue } from '#/model';
import { fixtureHeadingSet, fixtureInputRules, fixtureItalic } from '#/plugins/__tests__/fixtures/features';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { pressKey, setSelection, typeText } from '#/testing';

import {
    stored,
    para,
    words,
    TEXT_INSERT,
    start,
    replacing,
    forbid,
    endComposition,
    settleInput,
    installRuntimeHooks,
} from './fixtures/start';

installRuntimeHooks();

describe('input rules', () => {
    const ruleModel = compileContentModel([core(), bold(), fixtureItalic(), fixtureHeadingSet(), fixtureInputRules()], {
        id: 'test.bold',
        version: 1,
    });
    /** The first block's type, then each text run with its marks, such as `paragraph x[bold]`. */
    const shapeOf = (doc: Node) => {
        const block = doc.child(0);
        const runs: string[] = [block.type.name];
        for (const node of block.children) {
            runs.push(`${node.text ?? ''}${node.marks.map((mark) => `[${mark.type.name}]`).join('')}`);
        }

        return runs.join(' ');
    };

    // Each rule of the stand-in, what is typed, and the first block once it fired.
    const rules: readonly (readonly [string, string, string])[] = [
        ['heading.hashes', '## ', 'heading'],
        ['bold.stars', '**x**', 'paragraph x[bold]'],
        ['bold.underscores', '__x__', 'paragraph x[bold]'],
        ['italic.star', '*x*', 'paragraph x[italic]'],
        ['italic.underscore', '_x_', 'paragraph x[italic]'],
        ['strike.tildes', '~~x~~', 'paragraph x[strike]'],
        ['code.backtick', '`x`', 'paragraph x[code]'],
    ];
    const typedIn = (input: unknown, typed: string) => {
        const session = start(input, { model: ruleModel });
        typeText(session.handle, typed);

        return session;
    };

    for (const [id, typed, fired] of rules) {
        it(`restores ${typed} as typed with one undo and removes it with a second, for ${id}`, () => {
            const { handle, view } = typedIn(stored(para()), typed);
            const shapes = [shapeOf(view.state.doc)];
            for (const _undo of [1, 2]) {
                expect(handle.execute('history.undo').status).toBe('applied');
                shapes.push(shapeOf(view.state.doc));
            }

            expect(shapes).toEqual([fired, `paragraph ${typed}`, 'paragraph']);
        });

        it(`undoes ${id} with Backspace right after it fired, restoring ${typed}`, () => {
            const { handle, view } = typedIn(stored(para()), typed);

            pressKey(handle, 'Backspace');
            const restored = shapeOf(view.state.doc);
            // Backspace undoes nothing more once the rule is undone.
            pressKey(handle, 'Backspace');

            expect([restored, shapeOf(view.state.doc)]).toEqual([`paragraph ${typed}`, `paragraph ${typed}`]);
        });

        it(`fires no ${id} in a code block or inline code`, () => {
            const block = typedIn(stored({ type: 'code_block' }), typed);
            const inline = start(stored(para({ type: 'text', text: '..', marks: [{ type: 'code' }] })), {
                model: ruleModel,
            });
            setSelection(inline.handle, { text: '..', from: 1, to: 1 });
            typeText(inline.handle, typed);

            expect([shapeOf(block.view.state.doc), shapeOf(inline.view.state.doc)]).toEqual([
                `code_block ${typed}`,
                `paragraph .${typed}.[code]`,
            ]);
        });

        it(`fires no ${id} for its pattern pasted as plain text, inserted by a command, loaded or replaced`, async () => {
            const pasted = start(stored(para()), { model: ruleModel });
            pasted.view.pasteText(typed);
            const inserted = start(stored(para()), { model: ruleModel });
            inserted.handle.execute('text.insert', { text: typed });
            const loaded = start(stored(para(words(typed))), { model: ruleModel });
            const replaced = start(stored(para()), { model: ruleModel });
            await replaced.handle.replaceDocument(replacing(replaced.handle, stored(para(words(typed)))));

            expect([pasted, inserted, loaded, replaced].map(({ view }) => shapeOf(view.state.doc))).toEqual([
                `paragraph ${typed}`,
                `paragraph ${typed}`,
                `paragraph ${typed}`,
                `paragraph ${typed}`,
            ]);
        });
    }

    const refusals: readonly (readonly [string, string])[] = [
        ['marks.bold', '**x**'],
        ['fixture.heading-set', '## '],
    ];
    for (const [featureId, typed] of refusals) {
        it(`keeps ${typed} as typed when the policy forbids creating what ${featureId} adds`, () => {
            const { handle, view } = start(stored(para()), { model: ruleModel, policy: forbid(featureId, 'create') });

            typeText(handle, typed);

            expect(shapeOf(view.state.doc)).toBe(`paragraph ${typed}`);
        });
    }

    it('fires no rule for composed text, which stays one undo step', async () => {
        const session = start(stored(para(words('ab.'))), { model: ruleModel });
        const { handle, view } = session;
        setSelection(handle, { text: 'ab.', from: 3, to: 3 });
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        for (const character of '**x**') {
            const event = new InputEvent('beforeinput', { inputType: 'insertCompositionText', data: character });
            view.dom.dispatchEvent(event);
            view.dispatch(view.state.tr.insertText(character).setMeta('composition', 1));
        }

        const composing = shapeOf(view.state.doc);
        endComposition(session);
        await settleInput();
        const settled = shapeOf(view.state.doc);

        handle.execute('history.undo');

        expect([composing, settled, shapeOf(view.state.doc)]).toEqual([
            'paragraph ab.**x**',
            'paragraph ab.**x**',
            'paragraph ab.',
        ]);
    });

    it('undoes no rule with Backspace once a stored mark changed after it', () => {
        const { handle, view } = typedIn(stored(para()), '**x**');

        pressKey(handle, 'Mod-b');
        pressKey(handle, 'Backspace');

        expect(shapeOf(view.state.doc)).toBe('paragraph x[bold]');
    });

    it('undoes no rule with Backspace once the caret moved or a character was typed after it', () => {
        const moved = typedIn(stored(para()), '**x**');
        setSelection(moved.handle, { text: 'x', from: 0, to: 0 });
        pressKey(moved.handle, 'Backspace');
        const typed = typedIn(stored(para()), '**x**y');
        pressKey(typed.handle, 'Backspace');

        expect([shapeOf(moved.view.state.doc), shapeOf(typed.view.state.doc)]).toEqual([
            'paragraph x[bold]',
            'paragraph x[bold] y',
        ]);
    });

    it('runs the rule undo before a feature that binds Backspace, which then gets the next one', () => {
        const backspaceMark = defineFeature({
            id: 'fixture.backspace-mark',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
        });
        const part = defineEditorPart(backspaceMark, {
            needs: ['insert'],
            commands: { 'fixture.text.insert': TEXT_INSERT },
            keys: { Backspace: { command: 'fixture.text.insert', payload: { text: '!' } } },
        });
        const model = compileContentModel(
            [core(), bold(), fixtureItalic(), fixtureHeadingSet(), fixtureInputRules(), backspaceMark()],
            { id: 'test.bold', version: 1 },
        );
        const { handle, view } = start(stored(para()), { model, parts: [part] });
        typeText(handle, '**x**');

        pressKey(handle, 'Backspace');
        const undone = shapeOf(view.state.doc);
        pressKey(handle, 'Backspace');

        expect([undone, shapeOf(view.state.doc)]).toEqual(['paragraph **x**', 'paragraph **x**!']);
    });

    it('undoes a rule with Mod-z and redoes it with Mod-Shift-z', () => {
        const { handle, view } = typedIn(stored(para()), '**x**');

        pressKey(handle, 'Mod-z');
        const undone = shapeOf(view.state.doc);
        pressKey(handle, 'Mod-Shift-z');

        expect([undone, shapeOf(view.state.doc)]).toEqual(['paragraph **x**', 'paragraph x[bold]']);
    });

    it('fires no rule whose match starts inside inline code', () => {
        const session = start(stored(para({ type: 'text', text: '**a', marks: [{ type: 'code' }] })), {
            model: ruleModel,
        });
        setSelection(session.handle, { text: '**a', from: 3, to: 3 });

        typeText(session.handle, '**');

        expect(shapeOf(session.view.state.doc)).toBe('paragraph **a[code] **');
    });

    it('fires no rule for a paste after a beforeinput that changed nothing', () => {
        const { view } = start(stored(para()), { model: ruleModel });
        view.dom.dispatchEvent(new InputEvent('beforeinput', { inputType: 'historyUndo', cancelable: true }));

        view.pasteText('**x**');

        expect(shapeOf(view.state.doc)).toBe('paragraph **x**');
    });

    it('undoes only a character typed right after a rule fired', () => {
        const { handle, view } = typedIn(stored(para()), '**x**y');
        expect(shapeOf(view.state.doc)).toBe('paragraph x[bold] y');

        handle.execute('history.undo');

        expect(shapeOf(view.state.doc)).toBe('paragraph x[bold]');
    });

    it('fires no mark rule after a word character, before one, or around text with an edge space', () => {
        const cases: readonly (readonly [string, JsonValue, string])[] = [
            ['re**ver**', para(), 're**ver**'],
            ['a~~b~~', para(), 'a~~b~~'],
            ['x`y`', para(), 'x`y`'],
            ['** x**', para(), '** x**'],
            ['**x **', para(), '**x **'],
            ['_x_', para(words('y')), '_x_y'],
        ];

        const shapes = cases.map(([typed, block]) => shapeOf(typedIn(stored(block), typed).view.state.doc));

        expect(shapes).toEqual(cases.map(([, , text]) => `paragraph ${text}`));
    });
});
