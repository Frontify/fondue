/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Label, TextInput } from '@frontify/fondue-components';
import { type FormEvent, useId, useRef, useState } from 'react';

import { EditorDialog, useEditorDialog } from '#/bridge/define';
import { type OverlayProps, useEditorApi } from '#/bridge/plugin';
import { type CodecContext } from '#/model';

import styles from './styles/media.module.scss';

/** The command that sets an image's width, whose payload declares it in percent. */
export const SET_SIZE = 'image.size.set';
export const MIN_WIDTH = 10;
export const MAX_WIDTH = 100;

/** The width dialog's strings, in the UI locale. */
export interface WidthStrings {
    readonly title: string;
    readonly field: string;
    /** The error for a value outside the allowed percentages. */
    readonly range: string;
    readonly apply: string;
    readonly cancel: string;
}

/** The width dialog's strings in the UI locale of `t`. */
export const widthStrings = (t: CodecContext['t']): WidthStrings => ({
    title: t('RichTextEditor_imageWidthTitle'),
    field: t('RichTextEditor_imageWidthField'),
    range: t('RichTextEditor_imageWidthRange', { min: MIN_WIDTH, max: MAX_WIDTH }),
    apply: t('RichTextEditor_apply'),
    cancel: t('RichTextEditor_cancel'),
});

/**
 * The image menu's numeric field: a width in percent of the content width, from 10 to 100, whose Apply runs `apply`
 * on the image `nodeId`, and otherwise names the range and changes nothing. Every close returns focus to `opener`.
 */
export const WidthDialog = ({
    width,
    nodeId,
    opener,
    strings,
    close: onClose,
}: OverlayProps & {
    /** The image's `displayWidth`, or `null` at natural size. */
    readonly width: number | null;
    /** The image whose width Apply sets through `image.size.set`, as one undo step. */
    readonly nodeId: string;
    readonly strings: WidthStrings;
}) => {
    const api = useEditorApi();
    const dialog = useEditorDialog(opener, onClose);
    const [value, setValue] = useState(width === null ? '' : String(width));
    const [invalid, setInvalid] = useState(false);
    const fieldRef = useRef<HTMLInputElement>(null);
    const fieldId = useId();
    const errorId = useId();
    const apply = (event: FormEvent) => {
        event.preventDefault();
        const displayWidth = Number(value);
        if (
            value.trim() === '' ||
            !Number.isInteger(displayWidth) ||
            displayWidth < MIN_WIDTH ||
            displayWidth > MAX_WIDTH
        ) {
            setInvalid(true);
            const field = fieldRef.current;
            // A field that already has focus hears no focus event, so it would not read its new description.
            if (field !== null && field.ownerDocument.activeElement === field) {
                dialog.announce(strings.range);
            } else {
                field?.focus();
            }
            return;
        }
        api?.select({ nodeId, at: 'node' });
        api?.commands.execute(SET_SIZE, { displayWidth });
        dialog.finish('opener');
    };
    let describedBy: { readonly 'aria-describedby'?: string } = {};
    if (invalid) {
        describedBy = { 'aria-describedby': errorId };
    }
    return (
        <EditorDialog
            dialog={dialog}
            title={strings.title}
            cancel={strings.cancel}
            submit={{ label: strings.apply, onSubmit: apply }}
        >
            <Label htmlFor={fieldId}>{strings.field}</Label>
            <TextInput
                ref={fieldRef}
                id={fieldId}
                type="number"
                value={value}
                status={invalid ? 'error' : 'neutral'}
                aria-errormessage={errorId}
                {...describedBy}
                onChange={(event) => {
                    setValue(event.target.value);
                    setInvalid(false);
                }}
            />
            {invalid && (
                <p id={errorId} className={styles.error}>
                    {strings.range}
                </p>
            )}
        </EditorDialog>
    );
};
