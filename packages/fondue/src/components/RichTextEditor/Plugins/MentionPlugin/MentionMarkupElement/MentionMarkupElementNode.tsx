/* (c) Copyright Frontify Ltd., all rights reserved. */

import { combineMentionableKeyWith, renderMentionLabel } from '../helpers';
import { type MappedMentionableItems, type MentionableCategory } from '../types';

import { MarkupElementNodeComponent } from './MarkupElementNode';
import { type MarkupElementNodeType } from './types';

export const renderLabel = (mentionable: MappedMentionableItems, key: string, id: string) => mentionable.get(key) ?? id;

export const MentionMarkupElementNode =
    (mentionable: MappedMentionableItems): MarkupElementNodeType =>
    {
        const MentionMarkupElementNodeComponent: MarkupElementNodeType = (props) => {
            const { element, children } = props;

            const key = combineMentionableKeyWith(element?.category as MentionableCategory, String(element?.id));

            return (
                <MarkupElementNodeComponent category={element?.category as MentionableCategory} {...props}>
                    {renderMentionLabel(mentionable, key, String(element?.id))}
                    {children}
                </MarkupElementNodeComponent>
            );
        };
        return MentionMarkupElementNodeComponent;
    };
