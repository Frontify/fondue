/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LegacyOrderableListItem } from '@components/LegacyOrderableList';
import { HighlightColor, HighlightProps, StoryListItem } from '@components/LegacyOrderableList/utils/types';
import { ReactElement } from 'react';
import { merge } from '@utilities/merge';

const HighlightClasses: Record<HighlightColor, string> = {
    [HighlightColor.Violet]: 'tw-text-violet-60',
    [HighlightColor.Green]: 'tw-text-green-60',
    [HighlightColor.Red]: 'tw-text-red-60',
};

const Highlight = ({ color, children }: HighlightProps): ReactElement => (
    <span className={merge(['tw-font-medium', HighlightClasses[color]])}>{children}</span>
);

export const storyItems: LegacyOrderableListItem<StoryListItem>[] = [
    {
        id: '1',
        textContent: (
            <p>
                The list rendering is completely customizable through the &nbsp;
                <Highlight color={HighlightColor.Green}>renderContent</Highlight> callback prop.
            </p>
        ),
        alt: 'one',
        sort: 1,
    },
    {
        id: '3',
        textContent: (
            <p>
                Use the <Highlight color={HighlightColor.Green}>sort</Highlight> property in the &nbsp;
                <Highlight color={HighlightColor.Green}>OrderableListItem</Highlight> to determine the position of items
                items in the list.
            </p>
        ),
        alt: 'three',
        sort: 2,
    },
    {
        id: '4',
        textContent: <p>Items can contain multiple focusable elements.</p>,
        alt: 'four',
        sort: null,
    },
    {
        id: '7',
        textContent: (
            <p>
                The drag-preview is created as a new element, using the
                <Highlight color={HighlightColor.Green}>renderContent</Highlight> callback with the dragged item key to
                render its content. The state of any interactive items must be managed outside of the list to achieve
                consistent rendering in the drag preview.
            </p>
        ),
        alt: 'seven',
        sort: 3,
    },
];
