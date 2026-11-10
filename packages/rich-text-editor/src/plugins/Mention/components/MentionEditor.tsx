/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditProps } from '#/core';

import { mentionValueOf, safeMentionHref } from '../helpers/mention';
import { type MentionContentOptions } from '../Mention';
import { type MentionItems, type MentionValue } from '../types';

import { MentionDraft } from './MentionDraft';
import { MentionLink } from './MentionLink';

type MentionEditorProps = EditProps<MentionValue, MentionValue | null> & {
    items: MentionItems;
    trigger: string;
    href: MentionContentOptions['href'];
};

/**
 * The mention while editing: the picker until someone is chosen, then the mention itself.
 * `value` is null until someone is chosen.
 */
export const MentionEditor = ({
    value,
    setValue,
    isFocused,
    remove,
    api,
    items,
    trigger,
    href,
}: MentionEditorProps) => {
    if (value === null) {
        return (
            <MentionDraft
                trigger={trigger}
                items={items}
                focused={isFocused}
                onChoose={(person) => {
                    setValue(mentionValueOf(person));
                    // Return the caret to after the mention; the space keeps typing outside it.
                    api.focus();
                    api.insertText(' ');
                }}
                onCancel={(text) => {
                    remove();
                    api.focus();
                    api.insertText(text);
                }}
                onRemove={() => {
                    remove();
                    api.focus();
                }}
            />
        );
    }
    return <MentionLink value={value} href={safeMentionHref(href, value)} trigger={trigger} />;
};
