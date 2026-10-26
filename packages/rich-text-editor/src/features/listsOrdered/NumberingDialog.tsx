/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Label, TextInput } from '@frontify/fondue-components';
import { type FormEvent, useId, useRef, useState } from 'react';

import { EditorDialog, useEditorDialog } from '#/bridge/define';
import { type OverlayProps, useEditorApi } from '#/bridge/plugin';
import { type CodecContext, findInvalidPayload, type PayloadDeclaration } from '#/model';

/** The command the dialog runs, whose payload declaration bounds the number. */
export const SET_START = 'list.ordered.start.set';

/** The bounds that `payload` declares for `start`. */
const boundsOf = ({ fields }: PayloadDeclaration) => {
    const field = fields.start;
    if (field !== undefined && (field.type === 'integer' || field.type === 'number')) {
        const min = field.min ?? 0;
        const max = field.max ?? Number.MAX_SAFE_INTEGER;

        return { min, max };
    }

    return { min: 0, max: Number.MAX_SAFE_INTEGER };
};

/**
 * Start numbering at: one labelled number field whose Apply runs `SET_START` on the list at the selection as one undo
 * step when `payload` accepts the number, and otherwise shows the declared range and changes nothing.
 */
export const NumberingDialog = ({
    payload,
    initial,
    opener,
    close: onClose,
}: OverlayProps & {
    /** The payload declaration of `SET_START`. */
    payload: PayloadDeclaration;
    /** The `start` of the list at the selection when the dialog opened. */
    initial: number;
}) => {
    const api = useEditorApi();
    let t: CodecContext['t'] = (key) => key;
    if (api !== undefined) {
        t = api.t;
    }

    const dialog = useEditorDialog(opener, onClose);
    const [value, setValue] = useState(String(initial));
    const [invalid, setInvalid] = useState(false);
    const fieldRef = useRef<HTMLInputElement>(null);
    const fieldId = useId();
    const errorId = useId();
    const { min, max } = boundsOf(payload);
    const range = t('RichTextEditor_startNumberingRange', { min, max });
    let status: 'error' | 'neutral' = 'neutral';
    let describedBy: { 'aria-describedby'?: string } = {};
    if (invalid) {
        status = 'error';
        describedBy = { 'aria-describedby': errorId };
    }

    const apply = (event: FormEvent) => {
        event.preventDefault();
        const start = Number(value);
        if (value.trim() === '' || findInvalidPayload(payload, { start }) !== undefined) {
            setInvalid(true);
            const field = fieldRef.current;
            // A field that already has focus hears no focus event, so it would not read its new description.
            if (field !== null && field.ownerDocument.activeElement === field) {
                dialog.announce(range);
            } else {
                field?.focus();
            }

            return;
        }

        api?.commands.execute(SET_START, { start });
        dialog.finish('opener');
    };

    return (
        <EditorDialog
            dialog={dialog}
            title={t('RichTextEditor_startNumbering')}
            cancel={t('RichTextEditor_cancel')}
            submit={{ label: t('RichTextEditor_apply'), onSubmit: apply }}
        >
            <Label htmlFor={fieldId}>{t('RichTextEditor_startNumberingField')}</Label>
            <TextInput
                ref={fieldRef}
                id={fieldId}
                type="number"
                value={value}
                status={status}
                aria-errormessage={errorId}
                {...describedBy}
                onChange={(event) => {
                    setValue(event.target.value);
                    setInvalid(false);
                }}
            />
            {invalid && <p id={errorId}>{range}</p>}
        </EditorDialog>
    );
};
