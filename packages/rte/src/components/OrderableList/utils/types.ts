/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

export type StoryListItem = {
    textContent: JSX.Element;
};

export enum HighlightColor {
    Violet = 'Violet',
    Green = 'Green',
    Red = 'Red',
}

export type HighlightProps = {
    color: HighlightColor;
    children: ReactNode;
};
