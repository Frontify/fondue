/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog, Label, TextInput } from '@frontify/fondue-components';
import { type FormEvent, useContext, useId, useState } from 'react';

import { SessionContext } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';
import { nearest } from '#/runtime/capabilities';
import { type EditorRuntime } from '#/runtime/runtime';

/** The numbering dialog's strings, in the UI locale. */
export interface NumberingStrings {
    readonly title: string;
    readonly field: string;
    readonly range: string;
    readonly apply: string;
    readonly cancel: string;
}

const MAX_START = 1_000_000;

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
 * Start numbering at: one labelled number field from 0 to 1,000,000, whose Apply runs `list.ordered.start.set` on the
 * list at the selection as one undo step, and whose other values show an error and change nothing
 * (SPEC-rich-text-editing/AC-090).
 */
export const NumberingDialog = ({
    strings,
    onClose,
}: {
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
    let status: 'error' | 'neutral' = 'neutral';
    if (invalid) {
        status = 'error';
    }
    const apply = (event: FormEvent) => {
        event.preventDefault();
        const start = Number(value);
        if (value.trim() === '' || !Number.isInteger(start) || start < 0 || start > MAX_START) {
            setInvalid(true);
            return;
        }
        runtime?.handle.execute('list.ordered.start.set', { start });
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
                        {invalid && <p role="alert">{strings.range}</p>}
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
