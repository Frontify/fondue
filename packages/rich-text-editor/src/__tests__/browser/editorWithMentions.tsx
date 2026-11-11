/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import {
    defaultPlugins,
    mentionPlugin,
    RichTextEditor,
    type RichTextEditorProps,
    RichTextRenderer,
    type RichTextRendererProps,
} from '../../index';

// A component test can only pass serialisable props, so the plugin list is built here, on the page.

const PEOPLE = [
    { id: 'jane', username: 'jane', name: 'Jane Doe' },
    { id: 'design', username: 'design', name: 'Design team', kind: 'group' as const },
];

const plugins = [...defaultPlugins, mentionPlugin({ items: PEOPLE, href: ({ id }) => `#/people/${id}` })];

type EditorWithMentionsProps = Omit<RichTextEditorProps, 'plugins'>;

type RendererWithMentionsProps = Omit<RichTextRendererProps, 'plugins'>;

/** The editor with the default plugins and mentions. */
export const EditorWithMentions = (props: EditorWithMentionsProps): ReactNode => (
    <RichTextEditor {...props} plugins={plugins} />
);

/** The renderer with the default plugins and mentions. */
export const RendererWithMentions = (props: RendererWithMentionsProps): ReactNode => (
    <RichTextRenderer {...props} plugins={plugins} />
);
