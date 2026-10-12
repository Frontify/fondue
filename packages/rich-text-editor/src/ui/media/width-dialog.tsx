/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog, Label, TextInput } from '@frontify/fondue-components';
import { type FormEvent, useContext, useId, useState } from 'react';

import { SessionContext } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';

import styles from './styles/media.module.scss';

/** The command the dialog runs, whose payload declares the width in percent. */
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

/**
 * The image menu's numeric field: a width in percent of the content width, from 10 to 100, whose Apply runs
 * `image.size.set` on the image `nodeId` as one undo step, and otherwise names the range and changes nothing. Every
 * close returns focus to `opener`.
 */
export const WidthDialog = ({
    nodeId,
    width,
    opener,
    strings,
    onClose,
}: {
    readonly nodeId: string;
    /** The image's `displayWidth`, or `null` at natural size. */
    readonly width: number | null;
    readonly opener: Element | null;
    readonly strings: WidthStrings;
    readonly onClose: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(width === null ? '' : String(width));
    const [invalid, setInvalid] = useState(false);
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
            return;
        }
        runtime?.nodeActions(nodeId).execute(SET_SIZE, { displayWidth });
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
                <Dialog.Header showCloseButton={false}>
                    <Dialog.Title>{strings.title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <form id={formId} onSubmit={apply} noValidate>
                        <Label htmlFor={fieldId}>{strings.field}</Label>
                        <TextInput
                            id={fieldId}
                            type="number"
                            value={value}
                            status={invalid ? 'error' : 'neutral'}
                            {...describedBy}
                            onChange={(event) => {
                                setValue(event.target.value);
                                setInvalid(false);
                            }}
                        />
                        {invalid && (
                            <p id={errorId} role="alert" className={styles.error}>
                                {strings.range}
                            </p>
                        )}
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
