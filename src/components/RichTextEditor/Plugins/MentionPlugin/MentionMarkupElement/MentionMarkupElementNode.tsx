/* eslint-disable react/display-name */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { combineMentionableKeyWith, renderMentionLabel } from '../helpers';
import { MappedMentionableItems, MentionableCategory } from '../types';
import { MarkupElementNodeComponent } from './MarkupElementNode';
import { MarkupElementNodeType } from './types';

export const renderLabel = (mentionable: MappedMentionableItems, key: string, id: string) => mentionable.get(key) ?? id;

export const MentionMarkupElementNode =
    (mentionable: MappedMentionableItems): MarkupElementNodeType =>
    (props) => {
        const { element, children } = props;

        const key = combineMentionableKeyWith(element?.category as MentionableCategory, String(element?.id));

        return (
            <MarkupElementNodeComponent category={element?.category as MentionableCategory} {...props}>
                {renderMentionLabel(mentionable, key, String(element?.id))}
                {children}
            </MarkupElementNodeComponent>
        );
    };
