/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog, Label, TextInput } from '@frontify/fondue-components';
import { type CSSProperties, type FormEvent, useEffect, useId, useRef, useState } from 'react';

import { createAnnouncer, type OverlayProps, useEditorApi, useEditorOverlay } from '#/bridge/plugin';
import { type CodecContext, findInvalidPayload, type PayloadDeclaration } from '#/model';

/** The command the dialog runs, whose payload declaration bounds the number. */
export const SET_START = 'list.ordered.start.set';

const VISUALLY_HIDDEN: CSSProperties = {
    position: 'absolute',
    inlineSize: 1,
    blockSize: 1,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
};

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
    close: onClose,
}: OverlayProps & {
    /** The payload declaration of `SET_START`. */
    readonly payload: PayloadDeclaration;
    /** The `start` of the list at the selection when the dialog opened. */
    readonly initial: number;
}) => {
    const api = useEditorApi();
    let t: CodecContext['t'] = (key) => key;
    if (api !== undefined) {
        t = api.t;
    }
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(String(initial));
    const [invalid, setInvalid] = useState(false);
    const fieldRef = useRef<HTMLInputElement>(null);
    // The dialog's own polite region, since a modal dialog hides the editor's from a screen reader.
    const [announcer] = useState(createAnnouncer);
    useEffect(() => announcer.dispose, [announcer]);
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    const fieldId = useId();
    const errorId = useId();
    const formId = useId();
    const { min, max } = boundsOf(payload);
    const range = t('RichTextEditor_startNumberingRange', { min, max });
    let status: 'error' | 'neutral' = 'neutral';
    let describedBy: { readonly 'aria-describedby'?: string } = {};
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
                announcer.announce(range);
            } else {
                field?.focus();
            }
            return;
        }
        api?.commands.execute(SET_START, { start });
        close(false);
    };
    return (
        <Dialog.Root open={open} onOpenChange={overlay.onOpenChange} modal>
            <Dialog.Content ref={overlay.contentRef} container={overlay.container} maxWidth="400px">
                <Dialog.Header>
                    <Dialog.Title>{t('RichTextEditor_startNumbering')}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <form id={formId} onSubmit={apply} noValidate>
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
                        <div ref={announcer.setRegion} role="status" style={VISUALLY_HIDDEN} />
                    </form>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button emphasis="default" onPress={() => close(false)}>
                        {t('RichTextEditor_cancel')}
                    </Button>
                    <Button type="submit" form={formId} emphasis="strong">
                        {t('RichTextEditor_apply')}
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
};
