/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { orderedList } from '#/features/lists-ordered/feature';
import { taskList } from '#/features/lists-task/feature';
import { type ContentNodeJSON } from '#/model';
import { item, list, listModel, outlineOf } from '#/react/__tests__/fixtures/lists';
import { mountText, para, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { setSelection, typeText } from '#/testing';

const model = listModel();
type Mounted = ReturnType<typeof mountText>;

const onPlatform = (apple: boolean) => {
    let platform = 'Win32';
    if (apple) {
        platform = 'MacIntel';
    }
    vi.spyOn(navigator, 'platform', 'get').mockReturnValue(platform);
};
beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

interface Press {
    readonly key: string;
    readonly meta?: boolean;
    readonly ctrl?: boolean;
    readonly shift?: boolean;
}
const press = ({ view }: Mounted, { key, meta = false, ctrl = false, shift = false }: Press) => {
    const event = new KeyboardEvent('keydown', {
        key,
        metaKey: meta,
        ctrlKey: ctrl,
        shiftKey: shift,
        bubbles: true,
        cancelable: true,
    });
    view.dom.dispatchEvent(event);
};

/** A shortcut row of the list features, with the blocks it starts from and the text the caret sits in. */
interface Row {
    readonly command: string;
    readonly key: string;
    readonly shift: boolean;
    readonly blocks: readonly ContentNodeJSON[];
    readonly at: string;
    /** The command the change reports, when the key's command runs another. */
    readonly reports?: string;
}
const nested = list('bullet', [item('bullet', 'one', list('bullet', [item('bullet', 'two')]))]);
const ROWS: readonly Row[] = [
    { command: 'list.bullet.toggle', key: '8', shift: true, blocks: [para(text('one'))], at: 'one' },
    { command: 'list.ordered.toggle', key: '7', shift: true, blocks: [para(text('one'))], at: 'one' },
    { command: 'list.task.toggle', key: '9', shift: true, blocks: [para(text('one'))], at: 'one' },
    {
        command: 'list.indent',
        key: ']',
        shift: false,
        blocks: [list('bullet', [item('bullet', 'one'), item('bullet', 'two')])],
        at: 'two',
    },
    { command: 'list.outdent', key: '[', shift: false, blocks: [nested], at: 'two' },
    {
        command: 'task.indent',
        key: ']',
        shift: false,
        blocks: [list('task', [item('task', 'one'), item('task', 'two')])],
        at: 'two',
    },
    {
        command: 'task.outdent',
        key: '[',
        shift: false,
        blocks: [list('task', [item('task', 'one', list('task', [item('task', 'two')]))])],
        at: 'two',
    },
    {
        command: 'task.toggle',
        key: 'Enter',
        shift: false,
        blocks: [list('task', [item('task', 'one')])],
        at: 'one',
        reports: 'task.setChecked',
    },
];

describe('list shortcuts', () => {
    for (const apple of [true, false]) {
        let platform = 'other';
        if (apple) {
            platform = 'Apple';
        }
        for (const row of ROWS) {
            it(`runs ${row.command} with the ${platform} keys, and not with the other platform's`, () => {
                onPlatform(apple);
                const run = (keys: Press) => {
                    const mounted = mountText({ model, blocks: row.blocks });
                    setSelection(mounted.handle, { text: row.at, from: 1, to: 1 });
                    press(mounted, keys);
                    const ran = mounted.changes.map(({ commandId }) => commandId);
                    mounted.unmount();
                    return ran;
                };

                const own = run({ key: row.key, shift: row.shift, meta: apple, ctrl: !apple });
                const foreign = run({ key: row.key, shift: row.shift, meta: !apple, ctrl: apple });

                expect(own).toEqual([row.reports ?? row.command]);
                expect(foreign).toEqual([]);
            });
        }
    }
});

describe('list input rules', () => {
    const ALLOW = { create: true, edit: true, remove: true, paste: true };
    const RULES = [
        ['list.bullet.marker', 'lists.bullet', '- ', { ul: [['']] }],
        ['list.ordered.number', 'lists.ordered', '3. ', { ol: [['']], start: 3 }],
        ['list.task.brackets', 'lists.task', '[x] ', { tasks: [['[x]', '']] }],
    ] as const;
    const factories = [listItem, bulletList, orderedList, taskList];

    for (const [id, featureId, typed, fired] of RULES) {
        it(`applies ${id} only while it is on, its feature is installed and the policy allows creation`, () => {
            const missing = textModel([
                ...textFeatures(),
                ...factories.map((factory) => factory()).filter((feature) => feature.id !== featureId),
            ]);
            const typedIn = (options: Parameters<typeof mountText>[0]) => {
                const mounted = mountText({ model, blocks: [para()], ...options });
                typeText(mounted.handle, typed);
                const result = outlineOf(mounted.handle);
                mounted.unmount();
                return result;
            };

            expect([
                typedIn({}),
                typedIn({ inputRules: { exclude: [id] } }),
                typedIn({ model: missing }),
                typedIn({ policy: { features: { [featureId]: { ...ALLOW, create: false } } } }),
            ]).toEqual([[fired], [typed], [typed], [typed]]);
        });
    }
});
