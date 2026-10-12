/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog, Label, TextInput } from '@frontify/fondue-components';
import { type FormEvent, useContext, useId, useState } from 'react';

import { SessionContext } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';
import { type PayloadDeclaration } from '#/model';
import { findInvalidPayload } from '#/model/values';
import { nearest } from '#/runtime/positions';
import { type EditorRuntime } from '#/runtime/runtime';

/** The command the dialog runs, whose payload declaration bounds the number. */
export const SET_START = 'list.ordered.start.set';

/** The numbering dialog's strings, in the UI locale. */
export interface NumberingStrings {
    readonly title: string;
    readonly field: string;
    /** The error for a value outside `min` to `max`. */
    readonly range: (min: number, max: number) => string;
    readonly apply: string;
    readonly cancel: string;
}

/** The bounds that `payload` declares for `start`. */
const boundsOf = ({ fields }: PayloadDeclaration) => {
    const field = fields.start;
    if (field?.type === 'integer' || field?.type === 'number') {
        return { min: field.min ?? 0, max: field.max ?? Number.MAX_SAFE_INTEGER };
    }
    return { min: 0, max: Number.MAX_SAFE_INTEGER };
};

/** The `start` of the nearest ordered list around the selection, which `list.ordered.start.set` changes. */
const currentStart = (runtime: EditorRuntime | undefined): string => {
    const view = runtime?.view;
    const type = view?.state.schema.nodes.ordered_list;
    if (view === undefined || type === undefined) {
        return '';
    }
    const found = nearest(view.state, type);
    if (found === undefined) {
        return '';
    }
    return String(found.node.attrs.start);
};

/**
 * Start numbering at: one labelled number field whose Apply runs `SET_START` on the list at the selection as one undo
 * step when `payload` accepts the number, and otherwise shows the declared range and changes nothing.
 */
export const NumberingDialog = ({
    payload,
    strings,
    onClose,
}: {
    /** The payload declaration of `SET_START`. */
    readonly payload: PayloadDeclaration;
    readonly strings: NumberingStrings;
    /** Runs once the dialog closes, with or without a change. */
    readonly onClose: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(() => currentStart(runtime));
    const [invalid, setInvalid] = useState(false);
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    const fieldId = useId();
    const formId = useId();
    const { min, max } = boundsOf(payload);
    let status: 'error' | 'neutral' = 'neutral';
    if (invalid) {
        status = 'error';
    }
    const apply = (event: FormEvent) => {
        event.preventDefault();
        const start = Number(value);
        if (value.trim() === '' || findInvalidPayload(payload, { start }) !== undefined) {
            setInvalid(true);
            return;
        }
        runtime?.handle.execute(SET_START, { start });
        close(false);
    };
    return (
        <Dialog.Root open={open} onOpenChange={overlay.onOpenChange} modal>
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
                            status={status}
                            onChange={(event) => {
                                setValue(event.target.value);
                                setInvalid(false);
                            }}
                        />
                        {invalid && <p role="alert">{strings.range(min, max)}</p>}
                    </form>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button emphasis="default" onPress={() => close(false)}>
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
