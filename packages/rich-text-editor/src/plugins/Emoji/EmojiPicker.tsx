/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, TextInput } from '@frontify/fondue-components';

import { Listbox } from '#/bridge/define';
import { type EditorApi, type OverlayProps, useEditorApi } from '#/bridge/plugin';

import styles from './styles/emoji.module.scss';
import { useEmojiPickerState } from './useEmojiPickerState';

/**
 * The emoji picker: a dialog at the selection with a search combobox over a listbox, as the WAI-ARIA combobox pattern
 * has it. Focus stays in the field; the arrows move the active option, Enter and a click insert it and return focus to
 * the surface, and Escape closes the picker back to the surface. The data loads when the picker first opens.
 */
const Picker = ({
    api,
    onClose,
}: {
    api: EditorApi;
    /** Runs once the picker closes, with or without an insertion. */
    onClose: () => void;
}) => {
    const { open, overlay, title, testId, field, list, fieldRef, statusRef } = useEmojiPickerState(api, onClose);

    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                // Radix gives the content `role="dialog"`, which `Flyout` passes this name to.
                aria-label={title}
                container={overlay.container}
                side="bottom"
                align="start"
                padding="tight"
                width="280px"
                data-test-id={`${testId}-emoji-picker`}
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    fieldRef.current?.focus();
                }}
            >
                <Flyout.Body>
                    <div className={styles.picker}>
                        <TextInput {...field} ref={fieldRef} />
                        {list !== null && <Listbox {...list} />}
                        <div ref={statusRef} role="status" className={styles.status} />
                    </div>
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};

/** The picker the emoji button opens, once the session is ready. */
export const EmojiPicker = ({ close }: OverlayProps) => {
    const api = useEditorApi();
    if (api === undefined) {
        return null;
    }

    return <Picker api={api} onClose={close} />;
};
