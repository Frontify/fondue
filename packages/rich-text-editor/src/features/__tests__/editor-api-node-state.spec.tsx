/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type CommandOutcome, defineReactPresentation, type EditorApi } from '#/entries/authoring';
import { align, bold, codeBlock, core, fontColor, heading, links, mediaImage } from '#/features';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import { type SelectionHandle } from '#/index';
import { type ColorToken, compileContentModel } from '#/model';
import { runtimeOf } from '#/runtime/runtime';
import { type CommandState } from '#/runtime/types';
import { pressKey, setSelection, typeText } from '#/testing';

import {
    PANEL,
    type Handle,
    paragraph,
    title,
    blocksOf,
    attrsAt,
    probePanel,
    probeHarness,
} from './fixtures/editor-api';

let script: (api: EditorApi) => boolean = () => false;
let seen: CommandOutcome | CommandState | undefined;
let held: SelectionHandle | undefined;
let live: EditorApi | undefined;

const { mount, runIn } = probeHarness({
    script: () => script,
    setScript: (run) => {
        script = run;
    },
    setLive: (api) => {
        live = api;
    },
});

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

beforeEach(() => {
    script = () => false;
    seen = undefined;
    held = undefined;
    live = undefined;
});

describe('a plugin command in an editor that cannot be edited', () => {
    it.each([
        ['read-only', { readOnly: true }],
        ['disabled', { disabled: true }],
    ])('writes nothing in a %s editor, even when it runs there', (_name, options) => {
        const { handle } = mount(options);

        const result = runIn(handle, 'Plain', (api) => api.insert.text('x'), 'fixture.api.read-only');

        expect(result).toEqual({ status: 'rejected', code: 'readonly' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('refuses the write of a command it runs, and still opens what only opens', () => {
        const { handle } = mount({ readOnly: true });

        runIn(
            handle,
            'Plain',
            (api) => {
                seen = api.commands.execute('text.insert', { text: 'x' });
                return true;
            },
            'fixture.api.read-only',
        );
        expect(seen).toEqual({ status: 'rejected', code: 'readonly' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);

        runIn(
            handle,
            'Plain',
            (api) => {
                api.panels.open(PANEL);
                return true;
            },
            'fixture.api.read-only',
        );
        expect(probePanel()).not.toBeNull();
    });
});

describe('a command that a plugin command runs', () => {
    it('opens its panel as the outer command would', () => {
        const { handle } = mount();

        runIn(handle, 'Plain', (api) => api.commands.execute('fixture.api.open').status === 'applied');

        expect(probePanel()).not.toBeNull();
    });

    it('passes the heading levels of the policy, as a command the host runs does', () => {
        const { handle } = mount({ policy: { creatableHeadingLevels: [1, 2] } });

        runIn(handle, 'Plain', (api) => {
            seen = api.commands.execute('heading.set', { level: 3 });
            return true;
        });
        expect(seen).toEqual({ status: 'rejected', code: 'not-allowed' });

        runIn(handle, 'Plain', (api) => {
            seen = api.commands.query('heading.set', { level: 3 });
            return true;
        });
        expect(seen).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
    });

    it('is refused where it would drop content its target cannot hold', () => {
        const { handle } = mount();

        runIn(handle, 'Plain', (api) => {
            seen = api.commands.execute('code-block.toggle', { languageId: 'typescript' });
            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'not-allowed' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('reports not-allowed when its run returns false after a write was refused as not allowed', () => {
        const { handle } = mount();
        // The paragraph holds bold text, which a code block cannot keep.
        script = (api) => api.blocks.set('code_block');
        setSelection(handle, { text: 'Plain', from: 1, to: 1 });

        let result: ReturnType<Handle['execute']> | undefined;
        act(() => {
            result = handle.execute('fixture.api.run');
        });

        expect(result).toEqual({ status: 'rejected', code: 'not-allowed' });
        expect(handle.query('fixture.api.run')).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('is not enabled where it would open the picker for content the policy refuses', () => {
        const { handle } = mount({
            policy: { features: { 'media.image': { create: false, edit: true, remove: true, paste: true } } },
        });

        runIn(handle, 'Plain', (api) => {
            seen = api.commands.query('image.insert');
            return true;
        });

        expect(seen).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
    });
});

describe('what a plugin command defers', () => {
    it('runs nothing that its `enabled` check asked for', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });

        let result: ReturnType<Handle['execute']> | undefined;
        act(() => {
            result = handle.execute('fixture.api.enabled');
        });

        expect(result?.status).toBe('applied');
        expect(probePanel()).toBeNull();
    });

    it('releases no target when it is only queried', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        const captured = handle.captureTarget({ purpose: 'format', onIntersectingEdit: 'map' });
        if (captured.status !== 'captured') {
            throw new Error('The target was not captured.');
        }
        held = captured.target;
        script = (api) => {
            if (held !== undefined) {
                api.targets.release(held);
            }
            return true;
        };

        handle.query('fixture.api.run');

        expect(handle.execute('text.insert', { text: 'x' }, { target: held }).status).toBe('applied');
    });
});

describe('the key handlers of a plugin', () => {
    it('scrolls the selection into view when a handler takes its key', () => {
        const aligned = compileContentModel(
            [core(), bold(), heading(), align(), links(), fontColor(), codeBlock(), mediaImage(), spotlight()],
            { id: 'fixture.api', version: 1 },
        );
        const { handle } = mount({ model: aligned });
        const view = runtimeOf(handle)?.view;
        script = (api) => api.attributes.set('textblocks', { align: 'center' });
        setSelection(handle, { text: 'Plain', from: 1, to: 1 });
        const scrolls = () => (view?.state as unknown as { scrollToSelection: number }).scrollToSelection;
        const before = scrolls();

        act(() => {
            pressKey(handle, 'Mod-Alt-8');
        });

        expect(attrsAt(handle, 0)?.align).toBe('center');
        expect(scrolls()).toBe(before + 1);
    });
});

describe('the history of the editor API', () => {
    it('undoes and redoes, and a query reads whether it can undo without running anything', () => {
        const { handle } = mount();
        const canUndo = (): CommandState => {
            script = (api) => api.history.canUndo();
            return handle.query('fixture.api.run');
        };
        const before = [live?.history.canUndo(), canUndo().enabled];
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        typeText(handle, 'x');
        const typed = handle.getSnapshot().document;
        const undoable = live?.history.canUndo();
        const queryable = canUndo().enabled;
        const redoable = live?.history.canRedo();
        const after = [undoable, queryable, redoable];
        const queried = handle.getSnapshot().document;

        act(() => {
            live?.history.undo();
        });
        const undone = [blocksOf(handle), live?.history.canRedo()];
        act(() => {
            live?.history.redo();
        });

        expect(before).toEqual([false, false]);
        expect(after).toEqual([true, true, false]);
        expect(queried).toBe(typed);
        expect(undone).toEqual([[paragraph, title], true]);
        expect(handle.getSnapshot().document).toEqual(typed);
    });
});

describe('the services of the editor API', () => {
    it('holds the host data that only some plugins use apart from the document members', () => {
        mount();

        expect(live?.services.presentation()).toEqual({
            styles: [],
            colorTokens: [],
            columns: 1,
            columnGap: undefined,
        });
        expect(live?.services.references()).toBeUndefined();
        expect(live !== undefined && 'presentation' in live).toBe(false);
    });

    it("reads the presentation's styles, colour tokens and columns", () => {
        const colorTokens: ColorToken[] = [
            { id: 'brand.blue', label: 'Blue', value: '#0000ff', usage: ['font_color'] },
        ];
        mount({ presentation: defineReactPresentation({ colorTokens, columns: 3, columnGap: '24px' }) });

        expect(live?.services.presentation()).toEqual({ styles: [], colorTokens, columns: 3, columnGap: '24px' });
    });
});

describe('a command that a plugin command runs, given a name or payload it cannot take', () => {
    it('is rejected as an unknown command or an invalid payload, and a query of either is disabled', () => {
        const { handle } = mount();
        const answers: unknown[] = [];

        runIn(handle, 'Plain', (api) => {
            answers.push(
                api.commands.execute('missing.command'),
                api.commands.execute('link.set', { href: 'javascript:alert(1)' }),
                api.commands.execute('link.set', { href: 1 }),
                api.commands.query('missing.command'),
                api.commands.query('link.set', { href: 'javascript:alert(1)' }),
            );
            return false;
        });

        expect(answers).toEqual([
            { status: 'rejected', code: 'unknown-command' },
            { status: 'rejected', code: 'invalid-payload' },
            { status: 'rejected', code: 'invalid-payload' },
            { enabled: false, active: false, disabledReason: 'unknown-command' },
            { enabled: false, active: false, disabledReason: 'invalid-payload' },
        ]);
    });
});
