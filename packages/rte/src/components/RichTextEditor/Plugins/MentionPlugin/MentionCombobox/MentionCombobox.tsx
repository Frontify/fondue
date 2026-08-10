/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Combobox } from '@components/RichTextEditor/components/ComboBox/Combobox';
import { MentionComboboxItem } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionCombobox/MentionComboboxItem';
import { type ComboboxProps, comboboxActions } from '@udecode/plate-combobox';
import { getPluginOptions, useEditorRef } from '@udecode/plate-core';
import { ELEMENT_MENTION, type MentionPlugin, findMentionInput, getMentionOnSelectItem } from '@udecode/plate-mention';
import { getRange } from '@udecode/slate';

export function MentionCombobox({
    pluginKey = ELEMENT_MENTION,
    id = pluginKey,
    ...props
}: Partial<ComboboxProps> & {
    pluginKey?: string;
}) {
    const editor = useEditorRef();

    const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey);

    return (
        <Combobox
            id={id}
            trigger={trigger!}
            controlled
            onSelectItem={(_, item) => {
                const mentionInput = findMentionInput(editor, { at: [] });
                if (mentionInput) {
                    comboboxActions.targetRange(getRange(editor, mentionInput[1]));
                }

                getMentionOnSelectItem({
                    key: pluginKey,
                })(editor, item);
            }}
            onRenderItem={MentionComboboxItem}
            {...props}
        />
    );
}
