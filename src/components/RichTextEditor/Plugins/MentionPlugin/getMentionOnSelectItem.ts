/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ComboboxOnSelectItem,
    Data,
    ELEMENT_MENTION,
    MentionPlugin,
    NoData,
    PlateEditor,
    PlatePluginKey,
    TComboboxItem,
    TMentionElement,
    TNodeProps,
    Value,
    comboboxActions,
    comboboxSelectors,
    getPlugin,
    insertNodes,
    insertText,
    isNodeMentionInput,
    moveSelection,
    removeNodes,
    select,
    withoutMergingHistory,
    withoutNormalizing,
} from '@udecode/plate';

export interface CreateMentionNode<TData extends Data> {
    (item: TComboboxItem<TData>, meta: CreateMentionNodeMeta): TNodeProps<TMentionElement>;
}

export interface CreateMentionNodeMeta {
    search: string;
}

export const getMentionOnSelectItem =
    <TData extends Data = NoData>({ key = ELEMENT_MENTION }: PlatePluginKey = {}): ComboboxOnSelectItem<TData> =>
    (editor, item) => {
        const targetRange = comboboxSelectors.targetRange();
        if (!targetRange) {
            return;
        }

        const {
            type,
            options: { insertSpaceAfterMention, createMentionNode },
        } = getPlugin<MentionPlugin>(editor as unknown as PlateEditor<Value>, key);

        withoutNormalizing(editor, () => {
            // Selectors are sensitive to operations, it's better to create everything
            // before the editor state is changed. For example, asking for text after
            // removeNodes below will return null.
            const props = createMentionNode?.(item, {
                search: comboboxSelectors.text() ?? '',
            });

            select(editor, targetRange);

            withoutMergingHistory(editor, () =>
                removeNodes(editor, {
                    match: (node) => isNodeMentionInput(editor, node),
                }),
            );

            insertNodes<TMentionElement>(editor, {
                type,
                children: [{ text: '' }],
                ...props,
            } as TMentionElement);

            // move the selection after the element
            moveSelection(editor, { unit: 'offset' });

            if (insertSpaceAfterMention) {
                insertText(editor, ' ');
            }
        });

        return comboboxActions.reset();
    };
