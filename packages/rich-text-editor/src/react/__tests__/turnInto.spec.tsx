/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import { turnIntoChoices, type TurnIntoEntry } from '#/bridge/chrome/helpers/turnInto';
import { enUS } from '#/locales/en-US';
import { isRecord, type JsonValue } from '#/model';
import { codecContext } from '#/model/internal';
import { mountProfile } from '#/react/__tests__/fixtures/profiles';
import { loadProfile } from '#/react/profiles';
import { type CommandState } from '#/runtime/port';
import { runtimeOf } from '#/runtime/runtime';

import { pluginsOf } from '../compile/compileEditor';
import { turnIntoMenuEntries as installedChoices } from '../helpers/turnInto';
import { shipped as comment } from '../profiles/comment';
import { shipped as document } from '../profiles/document';

const { t } = codecContext(enUS, enUS);
const labelsOf = (profile: typeof document) =>
    installedChoices(pluginsOf(profile().definition), t, 'en-US').map(({ label }) => label);

describe('the Turn into entries a profile installs', () => {
    it('lists the paragraph, heading levels, quote, code block and lists of the Document profile in the slash menu order', () => {
        expect(labelsOf(document)).toEqual([
            'Normal text',
            'Heading 1',
            'Heading 2',
            'Heading 3',
            'Heading 4',
            'Heading 5',
            'Heading 6',
            'Quote',
            'Code block',
            'Bulleted list',
            'Numbered list',
            'Task list',
        ]);
    });

    it('leaves out the conversions of a feature the profile does not install', () => {
        expect(labelsOf(comment)).not.toContain('Heading 1');
        expect(labelsOf(comment)).toContain('Code block');
    });
});

const entry = (command: string, level?: number): TurnIntoEntry => ({
    key: `${command} ${level ?? ''}`,
    command,
    payload: level === undefined ? undefined : { level },
    label: command,
});

type State = Pick<CommandState, 'enabled' | 'active'>;

describe('the entries a block takes', () => {
    const entries = [
        entry('paragraph.set'),
        entry('heading.set', 1),
        entry('quote.toggle'),
        entry('code-block.toggle'),
    ];
    const states: Record<string, State> = {
        'paragraph.set ': { enabled: true, active: false },
        'heading.set 1': { enabled: false, active: false },
        'quote.toggle ': { enabled: true, active: false },
        'code-block.toggle ': { enabled: true, active: true },
    };
    const query =
        (table: Record<string, State>) =>
        (command: string, payload: JsonValue | undefined): CommandState => {
            let level = '';
            if (isRecord(payload)) {
                level = JSON.stringify(payload.level);
            }

            return { ...(table[`${command} ${level}`] ?? { enabled: false, active: false }), disabledReason: null };
        };

    const currentOf = (choices: ReturnType<typeof turnIntoChoices>) =>
        choices.filter(({ current }) => current).map(({ entry: { command } }) => command);

    it('keeps the entries whose command runs, and marks the active one as current', () => {
        const choices = turnIntoChoices(entries, query(states));

        expect(choices.map(({ entry: { command }, current }) => [command, current])).toEqual([
            ['paragraph.set', false],
            ['quote.toggle', false],
            ['code-block.toggle', true],
        ]);
    });

    it('keeps the current type though the policy refuses to create it', () => {
        const choices = turnIntoChoices(
            entries,
            query({ ...states, 'heading.set 1': { enabled: false, active: true } }),
        );

        expect(currentOf(choices)).toEqual(['heading.set']);
    });

    it('takes none when no entry is active, as for a divider that Quote could only wrap', () => {
        const inactive = { ...states, 'code-block.toggle ': { enabled: true, active: false } };

        expect(turnIntoChoices(entries, query(inactive))).toEqual([]);
    });

    it('marks Quote, not Normal text, for a paragraph inside a quote', () => {
        const inQuote = {
            ...states,
            'paragraph.set ': { enabled: true, active: true },
            'quote.toggle ': { enabled: true, active: true },
        };

        expect(currentOf(turnIntoChoices(entries, query(inQuote)))).toEqual(['quote.toggle']);
    });
});

describe('the entries a selected node of a live editor takes', () => {
    // The profile's module loads cold in a hook, which has the longer timeout, not in the first mount.
    beforeAll(async () => {
        await loadProfile('document');
    });

    type Handle = Awaited<ReturnType<typeof mountProfile>>['handle'];
    // The handle's typed `execute` and `query` list shipped commands only, and these name them by string.
    const run = (handle: Handle, id: string) => (handle.execute as (id: string) => unknown)(id);
    const select = (handle: Handle, name: string) => {
        const runtime = runtimeOf(handle);
        runtime?.view?.state.doc.descendants((node, pos) => {
            if (node.type.name !== name) {
                return true;
            }

            runtime.select({ node: pos });

            return false;
        });
    };

    const choicesOf = (handle: Handle) =>
        turnIntoChoices(installedChoices(pluginsOf(document().definition), t, 'en-US'), (command, payload) =>
            (handle.query as (id: string, payload?: JsonValue) => CommandState)(command, payload),
        ).map(({ entry: { label }, current }) => {
            if (current) {
                return `${label} (current)`;
            }

            return label;
        });

    it('is every conversion for a code block, marking Code block, and none for a divider', async () => {
        const { handle } = await mountProfile('document');
        act(() => {
            run(handle, 'code-block.toggle');
        });
        select(handle, 'code_block');
        const code = choicesOf(handle);
        act(() => {
            run(handle, 'code-block.toggle');
            run(handle, 'rule.insert');
        });
        select(handle, 'horizontal_rule');

        expect(code).toContain('Code block (current)');
        expect(code).toContain('Heading 3');
        expect(choicesOf(handle)).toEqual([]);
    });

    it('leaves out the heading levels the policy does not offer', async () => {
        const { handle } = await mountProfile('document');
        const { definition } = document();
        act(() => {
            run(handle, 'code-block.toggle');
            handle.updatePolicy({ ...definition.authoring, creatableHeadingLevels: [1, 2] });
        });
        select(handle, 'code_block');

        const choices = choicesOf(handle);

        expect(choices).toContain('Heading 2');
        expect(choices).not.toContain('Heading 3');
    });
});
