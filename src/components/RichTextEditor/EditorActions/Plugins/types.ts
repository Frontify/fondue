/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor } from '@udecode/plate';
import { ReactElement, ReactNode } from 'react';
import { UnknownObject } from '../types';
import type { Plugin } from './Plugin';

export type ButtonProps = {
    id: string;
    editor: PlateEditor<UnknownObject>;
    key?: string;
};

export type ButtonGroupProps = {
    index: number;
    children?: ReactNode;
};

export type Button = {
    id: string;
    button: ({ editor, id }: ButtonProps) => JSX.Element;
};
export type Buttons = Button[][];

export type Plugins = (Plugin[] | Plugin)[];

export type IconStylingWrapperProps = {
    icon: ReactElement;
};
