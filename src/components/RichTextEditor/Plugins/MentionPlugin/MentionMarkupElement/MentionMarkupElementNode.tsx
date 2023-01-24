/* eslint-disable react/display-name */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionableCategory, MentionableItem, MentionableItems } from '../types';
import { MarkupElementNodeComponent } from './MarkupElementNode';
import { MarkupElementNodeType } from './types';

const renderLabel = (mentionable: MentionableItems, key: string, category: MentionableCategory) =>
    mentionable.find(
        (mention: MentionableItem) => String(mention.key) === String(key) && category === mention.data.category,
    )?.text ?? key;

export const MentionMarkupElementNode =
    (mentionable: MentionableItems): MarkupElementNodeType =>
    (props) => {
        const {
            element: { key, category },
            children,
        } = props;

        return (
            <MarkupElementNodeComponent category={category as MentionableCategory} {...props}>
                {renderLabel(mentionable, String(key), category as MentionableCategory)}
                {children}
            </MarkupElementNodeComponent>
        );
    };
