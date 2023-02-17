/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonStyle } from '@components/Button';
import { IconColorFan16 } from '@foundation/Icon';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ContextMenu } from './ContextMenu';
import { ContextMenuType } from './types';

export default {
    title: 'Components/ContextMenu',
    component: ContextMenu,
    argTypes: {
        isOpen: {
            options: [true, false],
            control: { type: 'radio' },
        },
        contextMenuType: {
            options: ContextMenuType,
            control: { type: 'radio' },
        },
        title: {
            defaultValue: 'Referencing Content Block',
            control: { type: 'text' },
        },
        tooltip: {
            defaultValue: 'Place a reference of the block at your desired position.',
            control: { type: 'text' },
        },
        blockType: {
            defaultValue: 'Color Palette',
            control: { type: 'text' },
        },
    },
    args: {
        isOpen: true,
    },
} as Meta;

export const Default: StoryFn = ({ ...args }) => (
    <ContextMenu
        isOpen={args.isOpen}
        contextMenuType={args.contextMenuType}
        title={args.title}
        tooltip={args.tooltip}
        blockType={args.blockType}
        blockTypeIcon={<IconColorFan16 />}
        actionButtons={
            <>
                <Button style={ButtonStyle.Secondary}>Return to Block</Button>
                <Button>Cancel</Button>
            </>
        }
    />
);
