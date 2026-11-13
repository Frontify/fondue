/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditProps } from '#/core';

import { mentionDisplay } from '../helpers/display';
import { mentionValueOf } from '../helpers/mention';
import { type MentionHref, type MentionItems, type MentionResolve, type MentionValue } from '../types';

import { MentionDraft } from './MentionDraft';
import { MentionLink } from './MentionLink';
import { type MentionLabels } from './pickerLabels';

type MentionEditorProps = EditProps<MentionValue, MentionValue | null> & {
    items: MentionItems;
    trigger: string;
    href: MentionHref | undefined;
    resolve: MentionResolve | undefined;
    labels: MentionLabels;
};

/**
 * The mention while editing: the picker until someone is chosen, then the mention itself.
 * `value` is null until someone is chosen.
 */
export const MentionEditor = ({
    value,
    setValue,
    isFocused,
    editing,
    remove,
    api,
    items,
    trigger,
    href,
    resolve,
    labels,
}: MentionEditorProps) => {
    if (value === null) {
        return (
            <MentionDraft
                trigger={trigger}
                labels={labels}
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
    return (
        <MentionLink
            value={value}
            display={mentionDisplay(value, { resolve, href, trigger, labels })}
            placesCaret={editing}
        />
    );
};
