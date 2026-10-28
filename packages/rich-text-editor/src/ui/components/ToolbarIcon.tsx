/* (c) Copyright Frontify Ltd., all rights reserved. */

import { icons } from '@frontify/fondue-icons';
import { type ComponentType } from 'react';

const ICONS = icons as Readonly<Record<string, ComponentType<{ size?: 16 | 20; 'aria-hidden'?: boolean }>>>;

export type ToolbarIconProps = { name: string };

/** The Fondue icon called `name` at 20px, or nothing when Fondue has none of that name. */
export const ToolbarIcon = ({ name }: ToolbarIconProps) => {
    const Found = ICONS[name];
    if (Found === undefined) {
        return null;
    }

    return <Found size={20} aria-hidden />;
};

ToolbarIcon.displayName = 'ToolbarIcon';
