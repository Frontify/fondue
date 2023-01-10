/* eslint-disable react/display-name */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionableCategory, MentionableItem, MentionableItems } from '../types';
import { MarkupElementNodeComponent } from './MarkupElementNode';
import { MarkupElementNodeType } from './types';

const renderLabel = (mentionable: MentionableItems, key: string) =>
    mentionable.find((mention: MentionableItem) => mention.key === key)?.text ?? key;

export const MentionMarkupElementNode =
    (mentionable: MentionableItems): MarkupElementNodeType =>
    (props) => {
        const {
            element: { key, category },
            children,
        } = props;

        return (
            <MarkupElementNodeComponent category={category as MentionableCategory} {...props}>
                {renderLabel(mentionable, key as string)}
                {children}
            </MarkupElementNodeComponent>
        );
    };
