/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog, Label, TextInput } from '@frontify/fondue-components';
import { type FormEvent, useEffect, useId, useRef, useState } from 'react';

import { createAnnouncer, type OverlayProps, useEditorApi, useEditorOverlay } from '#/bridge/plugin';
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
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(width === null ? '' : String(width));
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
    const dismiss = (next: boolean) => {
        if (!next) {
            overlay.returnFocusTo(opener);
        }
        overlay.onOpenChange(next);
    };
    const fieldId = useId();
    const errorId = useId();
    const formId = useId();
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
                announcer.announce(strings.range);
            } else {
                field?.focus();
            }
            return;
        }
        api?.select({ nodeId, at: 'node' });
        api?.commands.execute(SET_SIZE, { displayWidth });
        overlay.returnFocusTo(opener);
        close(false);
    };
    let describedBy: { readonly 'aria-describedby'?: string } = {};
    if (invalid) {
        describedBy = { 'aria-describedby': errorId };
    }
    return (
        <Dialog.Root open={open} onOpenChange={dismiss} modal>
            <Dialog.Content ref={overlay.contentRef} container={overlay.container} maxWidth="400px">
                <Dialog.Header>
                    <Dialog.Title>{strings.title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <form id={formId} onSubmit={apply} noValidate>
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
                        <div ref={announcer.setRegion} role="status" className={styles.announcer} />
                    </form>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        emphasis="default"
                        onPress={() => {
                            overlay.returnFocusTo(opener);
                            close(false);
                        }}
                    >
                        {strings.cancel}
                    </Button>
                    <Button type="submit" form={formId} emphasis="strong">
                        {strings.apply}
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
};
