/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionComboboxItem } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionCombobox/MentionComboboxItem';
import { Combobox } from '@components/RichTextEditor/components/ComboBox/Combobox';
import {
    ComboboxProps,
    ELEMENT_MENTION,
    MentionPlugin,
    getMentionOnSelectItem,
    getPluginOptions,
    useEditorRef,
} from '@udecode/plate';

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
            onSelectItem={(_, item) =>
                getMentionOnSelectItem({
                    key: pluginKey,
                })(editor, item)
            }
            onRenderItem={MentionComboboxItem}
            {...props}
        />
    );
}
