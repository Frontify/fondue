/* (c) Copyright Frontify Ltd., all rights reserved. */

import { composeStories } from '@storybook/react-vite';
import { describe, expect, it } from 'vitest';

import { canonicalJson } from '#/model/hash';
import { engineOf, pluginsOf } from '#/react/compile-editor';
import { INPUT_RULE_ROWS, SHORTCUT_ROWS, SURFACE_KEY_ROWS } from '#/react/examples/keyboard';
import * as profileStories from '#/react/examples/profiles.stories';
import { shipped as brandDocument } from '#/react/profiles/brand-document';
import { shipped as comment } from '#/react/profiles/comment';
import { shipped as document } from '#/react/profiles/document';
import { shipped as inline } from '#/react/profiles/inline';
import { type RichTextProfile } from '#/react/types';
import { shortcutText } from '#/ui/shortcuts';

// A new profile with no entry here, or no story, fails to compile.
const BY_PROFILE: Readonly<
    Record<RichTextProfile, { readonly shipped: typeof inline; readonly story: typeof profileStories.Inline }>
> = {
    inline: { shipped: inline, story: profileStories.Inline },
    comment: { shipped: comment, story: profileStories.Comment },
    document: { shipped: document, story: profileStories.Document },
    'brand-document': { shipped: brandDocument, story: profileStories.BrandDocument },
};
const PROFILES = Object.entries(BY_PROFILE).map(([profile, { shipped, story }]) => ({
    profile: profile as RichTextProfile,
    shipped,
    story,
}));

describe('the keyboard reference of each profile story', () => {
    it('has one story per shipped profile, each of which renders its keyboard reference', () => {
        const stories = composeStories(profileStories);

        expect(Object.values(stories).map(({ args }) => args.profile)).toEqual(PROFILES.map(({ profile }) => profile));
        expect(PROFILES.map(({ story }) => story.args?.profile)).toEqual(PROFILES.map(({ profile }) => profile));
    });

    it.each(PROFILES)(
        'labels every binding of the $profile compiled keymap, in its order and as a tooltip shows it, and no other',
        ({ profile, shipped }) => {
            const listed = SHORTCUT_ROWS.filter(({ profiles }) => profiles.includes(profile)).map(
                ({ key, command, payload, apple, other }) => ({ key, command, payload, apple, other }),
            );
            const bound = engineOf(shipped().definition).keymap.map(({ key, command, payload }) => ({
                key,
                command,
                payload,
                apple: shortcutText(key, true),
                other: shortcutText(key, false),
            }));

            expect(listed).toEqual(bound);
        },
    );

    it('shows each surface key as a tooltip shows it', () => {
        expect(SURFACE_KEY_ROWS.map(({ apple, other }) => [apple, other])).toEqual(
            SURFACE_KEY_ROWS.map(({ key }) => [shortcutText(key, true), shortcutText(key, false)]),
        );
    });

    // The Apple and other-platform cells of the Shortcuts table of SPEC-rich-text-editing, by command and payload.
    it.each([
        ['history.undo', null, ['⌘Z'], ['Ctrl+Z']],
        ['history.redo', null, ['⇧⌘Z'], ['Ctrl+Shift+Z', 'Ctrl+Y']],
        ['mark.strike.toggle', null, ['⇧⌘X'], ['Ctrl+Shift+X']],
        ['mark.superscript.toggle', null, ['⌘.'], ['Ctrl+.']],
        ['mark.color.reapply', null, ['⇧⌘H'], ['Ctrl+Shift+H']],
        ['block.align.set', { align: 'left' }, ['⇧⌘L'], ['Ctrl+Shift+L']],
        ['format.inline.clear', null, ['⌘\\'], ['Ctrl+\\']],
        ['link.edit', null, ['⌘K'], ['Ctrl+K']],
        ['paragraph.set', null, ['⌥⌘0'], ['Ctrl+Shift+0']],
        ['heading.set', { level: 3 }, ['⌥⌘3'], ['Ctrl+Shift+3']],
        ['list.ordered.toggle', { start: 1 }, ['⇧⌘7'], ['Ctrl+Shift+7']],
        ['task.toggle', null, ['⌘Enter'], ['Ctrl+Enter']],
        ['block.move.up', null, ['⌥⌘↑'], ['Ctrl+Alt+Up']],
        ['block.move.down', null, ['⌥⌘↓'], ['Ctrl+Alt+Down']],
        ['column.break.insert', null, ['⇧⌘Enter'], ['Ctrl+Shift+Enter']],
        ['hard-break.insert', null, ['⇧Enter'], ['Shift+Enter']],
    ] as const)('shows %s as the Shortcuts table of the spec writes it', (command, payload, apple, other) => {
        const rows = SHORTCUT_ROWS.filter(
            (row) =>
                row.profiles.includes('brand-document') &&
                row.command === command &&
                canonicalJson(row.payload) === canonicalJson(payload),
        );

        expect(rows.map((row) => row.apple).filter((text) => text !== '')).toEqual(apple);
        expect(
            rows
                .map((row) => row.other)
                .filter((text) => text !== '')
                .sort(),
        ).toEqual([...other].sort());
    });

    it.each(PROFILES)('lists each input rule the $profile profile installs and no other', ({ profile, shipped }) => {
        const installed = pluginsOf(shipped().definition).flatMap(({ inputRules }) =>
            (inputRules ?? []).map(({ id }) => id),
        );
        const listed = INPUT_RULE_ROWS.filter(({ profiles }) => profiles.includes(profile)).map(({ id }) => id);

        expect(listed.sort()).toEqual(installed.sort());
    });
});
