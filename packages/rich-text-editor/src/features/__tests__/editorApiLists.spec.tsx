/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type CommandOutcome, type EditorApi } from '#/entries/authoring';
import { core } from '#/features';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import { bulletList } from '#/features/listsBullet/feature';
import { listItem } from '#/features/listsItem/feature';
import { taskList } from '#/features/listsTask/feature';
import { compileContentModel, type ContentNodeJSON, type RichTextDocument } from '#/model';
import { type CommandState } from '#/runtime/types';
import { setSelection } from '#/testing';

import { type Handle, stored, blocksOf, probeHarness } from './fixtures/editorApi';

let script: (api: EditorApi) => boolean = () => false;
let seen: CommandOutcome | CommandState | undefined;
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
    live = undefined;
});

describe('the lists of the editor API', () => {
    const listed = compileContentModel([core(), listItem(), bulletList(), taskList(), spotlight()], {
        id: 'fixture.api-lists',
        version: 1,
    });
    const line = (value: string): ContentNodeJSON => ({
        type: 'paragraph',
        attrs: { lang: null },
        content: value === '' ? [] : [{ type: 'text', text: value }],
    });
    const entry = (value: string, ...nested: ContentNodeJSON[]): ContentNodeJSON => ({
        type: 'list_item',
        content: [line(value), ...nested],
    });
    const bullets = (...items: ContentNodeJSON[]): ContentNodeJSON => ({
        type: 'bullet_list',
        attrs: { marker: null },
        content: items,
    });
    const mountLists = (...content: ContentNodeJSON[]) =>
        mount({
            model: listed,
            document: {
                ...stored,
                model: listed.ref,
                requiredCapabilities: listed.capabilities,
                content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content },
            } as unknown as RichTextDocument,
        });
    /** Each top-level block as the text of its paragraphs, a list as the list of its items. */
    const shape = (handle: Handle): unknown => {
        const of = (node: ContentNodeJSON): unknown => {
            if (node.type === 'paragraph') {
                return (node.content ?? []).map((child) => child.text).join('');
            }

            if (node.type === 'list_item' || node.type === 'task_item') {
                return (node.content ?? []).map(of);
            }

            return { [node.type]: (node.content ?? []).map(of) };
        };

        return (blocksOf(handle) ?? []).map(of);
    };

    it('reads whether the selection sits in a list of a type, with its attributes', () => {
        const { handle } = mountLists(line('zero'), bullets(entry('one')));

        setSelection(handle, { text: 'one' });
        const inList = live?.blocks.active('bullet_list');
        const inCircleList = live?.blocks.active('bullet_list', { marker: 'circle' });
        const inside = [inList, inCircleList];
        setSelection(handle, { text: 'zero' });

        expect([...inside, live?.blocks.active('bullet_list')]).toEqual([true, false, false]);
    });

    it('toggles, reads, indents and outdents lists, with the attributes of the item at the caret', () => {
        const { handle } = mountLists(line('zero'), bullets(entry('one'), entry('two')));
        const tasks: (boolean | undefined)[] = [];

        const wrapped = runIn(handle, 'zero', (api) => api.lists.toggle('bullet_list', 'list_item'))?.status;
        runIn(handle, 'one', (api) => {
            seen = { status: api.lists.active('bullet_list') && !api.lists.active('task_list') ? 'applied' : 'no-op' };

            return false;
        });
        const indentedOne = runIn(handle, 'one', (api) => api.lists.indent('list_item'))?.status;
        const indentedTwo = runIn(handle, 'two', (api) => api.lists.indent('list_item'))?.status;
        const indented = [indentedOne, indentedTwo];
        const nested = shape(handle);
        runIn(handle, 'two', (api) => api.lists.outdent('list_item'));
        const refused = runIn(handle, 'zero', (api) => api.lists.toggle('task_list', 'task_item', { done: true }));
        runIn(handle, 'one', (api) => api.lists.toggle('task_list', 'task_item', { checked: true }));
        const collect = (nodes: readonly ContentNodeJSON[] | undefined) => {
            for (const node of nodes ?? []) {
                if (node.type === 'task_item' || node.type === 'list_item') {
                    tasks.push(node.attrs?.checked as boolean | undefined);
                }

                collect(node.content);
            }
        };

        collect(blocksOf(handle));

        expect(wrapped).toBe('applied');
        expect(seen).toEqual({ status: 'applied' });
        expect(indented).toEqual(['applied', 'applied']);
        expect(nested).toEqual([{ bullet_list: [['zero', { bullet_list: [['one'], ['two']] }]] }]);
        expect(refused?.status).toBe('rejected');
        expect(tasks).toEqual([undefined, true, undefined]);
    });

    it('splits an item, moves an empty one out, and outdents an item from its start only with `atStart`', () => {
        const { handle } = mountLists(bullets(entry('one'), entry('two')));
        const at = (text: string, offset: number, run: (api: EditorApi) => boolean) => {
            setSelection(handle, { text, from: offset, to: offset });
            script = run;
            let result: ReturnType<Handle['execute']> | undefined;
            act(() => {
                result = handle.execute('fixture.api.run');
            });

            return result?.status;
        };

        const split = at('one', 1, (api) => api.lists.split('list_item'));
        const splitShape = shape(handle);
        // The first split leaves the caret in a new, empty item, which the second moves out of the list.
        const left = at('ne', 2, (api) => api.lists.split('list_item') && api.lists.split('list_item'));
        const leftShape = shape(handle);
        const midText = at('two', 1, (api) => api.lists.outdent('list_item', { atStart: true }));
        const atStart = at('two', 0, (api) => api.lists.outdent('list_item', { atStart: true }));
        const outside = at('two', 1, (api) => api.lists.split('list_item'));

        expect([split, left, midText, atStart, outside]).toEqual([
            'applied',
            'applied',
            'rejected',
            'applied',
            'rejected',
        ]);
        expect(splitShape).toEqual([{ bullet_list: [['o'], ['ne'], ['two']] }]);
        expect(leftShape).toEqual([{ bullet_list: [['o'], ['ne']] }, '', { bullet_list: [['two']] }]);
        expect(shape(handle)).toEqual([{ bullet_list: [['o'], ['ne']] }, '', 'two']);
    });
});
