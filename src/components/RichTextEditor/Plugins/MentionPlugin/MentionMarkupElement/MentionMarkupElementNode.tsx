/* eslint-disable react/display-name */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionElementProps, Value } from '@udecode/plate';
import { MentionComboboxItem, MentionableCategory, MentionableItems } from '../types';

const renderLabel = (mentionable: MentionableItems, key: string) =>
    mentionable.find((mention: MentionComboboxItem) => mention.key === key)?.text ?? key;

export const MentionMarkupElementNode = (mentionable: MentionableItems) => (props: MentionElementProps<Value>) => {
    const { attributes, children, element, nodeProps, prefix } = props;

    const backgroundColor: Record<MentionableCategory, string> = {
        [MentionableCategory.GROUP]: '#00FF00',
        [MentionableCategory.USER]: '#ff0000',
        [MentionableCategory.ALL]: '#0000FF',
    };

    return (
        <span
            {...attributes}
            data-slate-value={element.value}
            data-slate-key={element.key}
            data-slate-category={element.category}
            contentEditable={false}
            data-cy={`mention-${element.value?.replaceAll(' ', '-')}`}
            style={{
                padding: '3px 3px 2px',
                margin: '0 1px',
                verticalAlign: 'baseline',
                display: 'inline-block',
                borderRadius: '4px',
                backgroundColor: backgroundColor[element.category as MentionableCategory],
                fontSize: '0.9em',
            }}
            {...nodeProps}
        >
            {prefix}
            {renderLabel(mentionable, element.key as string)}
            {children}
        </span>
    );
};
