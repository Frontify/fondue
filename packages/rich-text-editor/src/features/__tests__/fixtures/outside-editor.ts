/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';

import { defineEditorPart, useRichTextNodeView } from '#/index';

import { badgeLabel, highlight } from './outside-feature';

/** The chrome of a badge: a toolbar with a button named by its label. */
const BadgeChrome = () => {
    const { attrs } = useRichTextNodeView();
    return createElement(
        'span',
        { role: 'toolbar', 'aria-label': 'Badge' },
        createElement('button', { type: 'button' }, `Badge ${badgeLabel(attrs.label)}`),
    );
};

/** The editor part of the outside feature: its highlight toggle with its key and toolbar entry, and its badge. */
export const highlightEditor = defineEditorPart(highlight, {
    needs: ['insert', 'marks'],
    commands: {
        'fixture.highlight.toggle': {
            run: (api) => api.marks.toggle('fixture_highlight'),
            active: (api) => api.marks.active('fixture_highlight'),
        },
    },
    keys: {
        'Mod-Shift-m': 'fixture.highlight.toggle',
        'Mod-Shift-y': (api) => api.insert.node('fixture_badge', { label: 'New' }).status === 'applied',
    },
    toolbar: [
        {
            id: 'highlight',
            kind: 'toggle',
            command: 'fixture.highlight.toggle',
            icon: 'IconTextFormatBold',
            label: { 'en-US': 'Highlight' },
        },
    ],
    views: [{ node: 'fixture_badge', component: BadgeChrome }],
});
