/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { type FrontifyDocument } from './core/document';
import { BoldPlugin } from './plugins/bold';
import { HeadingPlugin } from './plugins/heading';
import { RichTextEditor } from './react/RichTextEditor';

const initial: FrontifyDocument = {
    version: 1,
    blocks: [
        {
            type: 'paragraph',
            children: [{ text: 'Try typing here. Select text to test Bold (or hit ⌘B / Ctrl+B).' }],
        },
        {
            type: 'heading',
            level: 2,
            children: [{ text: 'This is a heading — use the dropdown to change its level.' }],
        },
    ],
};

const meta: Meta<typeof RichTextEditor> = {
    title: 'RTE v2 / Spike',
    component: RichTextEditor,
};
export default meta;

type Story = StoryObj<typeof RichTextEditor>;

export const BoldAndHeading: Story = {
    render: () => {
        const [doc, setDoc] = useState<FrontifyDocument>(initial);
        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    padding: 16,
                    height: '100vh',
                    boxSizing: 'border-box',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                <RichTextEditor value={doc} onChange={setDoc} plugins={[BoldPlugin, HeadingPlugin]} />
                <pre
                    style={{
                        background: '#f4f4f4',
                        padding: 12,
                        margin: 0,
                        overflow: 'auto',
                        fontSize: 12,
                        lineHeight: 1.4,
                        borderRadius: 4,
                    }}
                >
                    {JSON.stringify(doc, null, 2)}
                </pre>
            </div>
        );
    },
};
