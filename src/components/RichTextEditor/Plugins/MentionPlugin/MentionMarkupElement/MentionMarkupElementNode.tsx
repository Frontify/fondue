/* eslint-disable react/display-name */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { combineMentionableKeyWith } from '../helpers';
import { MappedMentionableItems, MentionableCategory } from '../types';
import { MarkupElementNodeComponent } from './MarkupElementNode';
import { MarkupElementNodeType } from './types';

const renderLabel = (mentionable: MappedMentionableItems, key: string, id: string) =>
    mentionable.has(key) ? mentionable.get(key) : id;

export const MentionMarkupElementNode =
    (mentionable: MappedMentionableItems): MarkupElementNodeType =>
    (props) => {
        const {
            element: { id, category },
            children,
        } = props;

        const key = combineMentionableKeyWith(category as MentionableCategory, String(id));

        return (
            <MarkupElementNodeComponent category={category as MentionableCategory} {...props}>
                {renderLabel(mentionable, key, String(id))}
                {children}
            </MarkupElementNodeComponent>
        );
    };
