/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { type OrderableListItem } from '@components/OrderableList';
import { HighlightColor, type HighlightProps, type StoryListItem } from '@components/OrderableList/utils/types';
import { merge } from '@utilities/merge';

const HighlightClasses: Record<HighlightColor, string> = {
    [HighlightColor.Violet]: 'tw-text-violet-60',
    [HighlightColor.Green]: 'tw-text-green-60',
    [HighlightColor.Red]: 'tw-text-red-60',
};

const Highlight = ({ color, children }: HighlightProps): ReactElement => (
    <span className={merge(['tw-font-medium', HighlightClasses[color]])}>{children}</span>
);

export const storyItems: OrderableListItem<StoryListItem>[] = [
    {
        id: '1',
        textContent: (
            <p>
                The list rendering is completely customizable through the &nbsp;
                <Highlight color={HighlightColor.Green}>renderContent</Highlight> callback prop, but also{' '}
                <Highlight color={HighlightColor.Violet}>Tree</Highlight> component functionality can be used for
                styling.
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
                The dragHandler can be positioned to the <Highlight color={HighlightColor.Green}>left</Highlight>,{' '}
                <Highlight color={HighlightColor.Green}>right</Highlight>, or{' '}
                <Highlight color={HighlightColor.Green}>hide (none)</Highlight>. When the setting is drag handler is set
                to <Highlight color={HighlightColor.Green}>none</Highlight> means that the whole lit item is draggable,
                otherwise only dragging from the handler will do the job.
            </p>
        ),
        alt: 'seven',
        sort: 3,
    },
];
