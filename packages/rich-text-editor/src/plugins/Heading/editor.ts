/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/pluginApi/plugin';

import { heading } from './feature';

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

/** Sets a heading level from Mod+Alt+1 to 6 (Ctrl+Shift on other platforms), `#` to `######` at a line start, or the toolbar. */
export const headingEditor = defineEditorPart(heading, {
    needs: ['blocks'],
    commands: {
        'heading.set': {
            payload: { fields: { level: { type: 'integer', min: 1, max: 6 } } },
            run: (api, { level }: { level: number }) => api.blocks.set('heading', { level }),
            active: (api, { level }) => api.blocks.active('heading', { level }),
            // A level the policy does not offer is refused before applicability, even in a heading of that level.
            refuses: (policy, { level }) => !policy.creatableHeadingLevels.some((offered) => offered === level),
        },
    },
    keys: Object.fromEntries(
        LEVELS.flatMap((level) => [
            [`mac:Mod-Alt-${level}`, { command: 'heading.set', payload: { level } }],
            [`other:Ctrl-Shift-${level}`, { command: 'heading.set', payload: { level } }],
        ]),
    ),
    inputRules: [
        {
            id: 'heading.hashes',
            kind: 'line-start',
            command: 'heading.set',
            markers: LEVELS.map((level) => ({ marker: '#'.repeat(level), payload: { level } })),
        },
    ],
    toolbar: LEVELS.map((level) => ({
        id: `heading-${level}`,
        kind: 'toggle' as const,
        command: 'heading.set',
        payload: { level },
        labelKey: `RichTextEditor_heading${level}`,
        icon: 'IconHeading',
        group: 'text',
    })),
});
