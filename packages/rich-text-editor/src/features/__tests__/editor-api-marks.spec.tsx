/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {} from '#/features';
import { type EditorApi } from '#/index';
import { runtimeOf } from '#/runtime/runtime';
import { setSelection } from '#/testing';

import { type Handle, model, paragraph, title, blocksOf, blockAt, childAt, probeHarness } from './fixtures/editor-api';

let script: (api: EditorApi) => boolean = () => false;
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
    live = undefined;
});

describe('the marks of the editor API', () => {
    it('names the marks the model installs', () => {
        mount();

        expect(live?.marks.installed()).toEqual(model.manifest.marks);
        expect(live?.marks.installed()).toContain('bold');
    });

    describe('reapply', () => {
        const runOn = (handle: Handle, at: string, run: (api: EditorApi) => boolean) => {
            script = run;
            setSelection(handle, { text: at });
            act(() => {
                handle.execute('fixture.api.run');
            });
        };

        it('changes nothing before a command set any of the named marks', () => {
            const { handle } = mount();

            runOn(handle, 'bold', (api) => api.marks.reapply(['font_color']));

            expect(blocksOf(handle)).toEqual([paragraph, title]);
        });

        it('sets again the last of the named marks a command set in the session, on another selection', () => {
            const { handle } = mount();

            runOn(handle, 'Plain', (api) => api.marks.set('font_color', { tokenId: 'brand.blue' }));
            runOn(handle, 'Title', (api) => api.marks.set('link', { href: 'https://frontify.com' }));
            runOn(handle, 'bold', (api) => api.marks.reapply(['font_color']));

            const content = blockAt(handle, 0)?.content;
            const types = (content ?? []).map(({ text, marks }) => [
                text,
                (marks ?? []).map(({ type }) => type).sort(),
            ]);
            expect(types).toEqual([
                ['Plain', ['font_color']],
                [' ', []],
                ['bold', ['bold', 'font_color']],
            ]);
        });
    });
});

describe('a mark write of the editor API', () => {
    it('reaches the run a caret touches at its trailing edge with `touching`', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('link', { href: 'https://frontify.com' });
        act(() => {
            handle.execute('fixture.api.run');
        });

        const linked = childAt(handle, 0)?.marks;
        setSelection(handle, { text: 'Plain', from: 5, to: 5 });
        script = (api) => api.marks.remove('link', { extendToMarkRange: true });
        act(() => {
            handle.execute('fixture.api.run');
        });
        expect(childAt(handle, 0)?.marks).toEqual(linked);

        setSelection(handle, { text: 'Plain', from: 5, to: 5 });
        script = (api) => api.marks.remove('link', { extendToMarkRange: 'touching' });
        act(() => {
            handle.execute('fixture.api.run');
        });
        expect(childAt(handle, 0)?.marks).toBeUndefined();
    });

    it('refuses to turn text into a block that drops its marks', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain bold' });

        const result = runIn(handle, 'bold', (api) => api.blocks.set('code_block'));

        expect(result?.status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });
});

describe('the marks of the editor API at a caret', () => {
    it('scrolls the selection into view when it only drops the stored marks', () => {
        const { handle } = mount();
        const view = runtimeOf(handle)?.view;
        setSelection(handle, { text: 'bold', from: 2, to: 2 });
        script = (api) => api.marks.remove('bold');
        const scrolls = () => (view?.state as unknown as { scrollToSelection: number }).scrollToSelection;
        const before = scrolls();

        act(() => {
            handle.execute('fixture.api.run');
        });

        expect(scrolls()).toBe(before + 1);
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });
});

describe('the mark runs of the editor API', () => {
    it('reads no run for a caret at the trailing edge of the run, or for an element outside the editor', () => {
        const { handle } = mount();
        const reads: unknown[] = [];
        setSelection(handle, { text: 'bold', from: 4, to: 4 });
        script = (api) => {
            reads.push(api.marks.run('bold'), api.marks.run('bold', { extendToMarkRange: 'touching' })?.text);
            reads.push(api.marks.run('bold', { at: document.createElement('span') }));
            return false;
        };

        act(() => {
            handle.execute('fixture.api.run');
        });

        expect(reads).toEqual([undefined, 'bold', undefined]);
    });
});
