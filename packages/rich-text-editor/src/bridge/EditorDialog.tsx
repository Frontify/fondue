/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog } from '@frontify/fondue-components';
import { type FormEvent, type ReactNode, useId, useState } from 'react';

import { useAnnounce } from './announcer';
import { type EditorOverlay, useEditorOverlay } from './overlays';

/** What a dialog body drives: where the close returns focus, and the editor's live region. */
export type EditorDialogControl = {
    readonly open: boolean;
    readonly overlay: EditorOverlay;
    /** Closes the dialog and returns focus to the control that opened it, or to the surface. */
    readonly finish: (focus: 'opener' | 'surface') => void;
    /** Speaks in the editor's polite live region, which Radix leaves out of the `aria-hidden` it sets on a modal's siblings. */
    readonly announce: (message: string) => void;
    readonly onOpenChange: (open: boolean) => void;
};

/** The open state, overlay wiring, focus return and announcements of a modal dialog that `opener` opened. */
export const useEditorDialog = (opener: Element | null, onClose: () => void): EditorDialogControl => {
    const [open, setOpen] = useState(true);
    const announce = useAnnounce();
    const close = () => {
        setOpen(false);
        onClose();
    };
    const overlay = useEditorOverlay(open, (next) => {
        if (!next) {
            close();
        }
    });
    const finish = (focus: 'opener' | 'surface') => {
        if (focus === 'opener') {
            overlay.returnFocusTo(opener);
        } else {
            overlay.returnFocusTo(null);
        }
        close();
    };
    // Escape and an outside press return focus to the opener, like Cancel.
    const onOpenChange = (next: boolean) => {
        if (!next) {
            overlay.returnFocusTo(opener);
        }
        overlay.onOpenChange(next);
    };
    return { open, overlay, finish, announce, onOpenChange };
};

/** A modal editor dialog: title, body and a footer of Cancel, the given actions and a submit button. */
export const EditorDialog = ({
    dialog,
    title,
    cancel,
    submit,
    actions,
    testId,
    children,
}: {
    readonly dialog: EditorDialogControl;
    readonly title: string;
    readonly cancel: string;
    /** Wraps the body in a form that the footer's submit button sends, which `onSubmit` handles. */
    readonly submit?: {
        readonly label: string;
        readonly onSubmit: (event: FormEvent) => void;
        readonly formClassName?: string | undefined;
    };
    /** Buttons between Cancel and the submit button. */
    readonly actions?: ReactNode;
    readonly testId?: string;
    readonly children: ReactNode;
}) => {
    const formId = useId();
    let testIdProp: { readonly 'data-test-id'?: string } = {};
    if (testId !== undefined) {
        testIdProp = { 'data-test-id': testId };
    }
    let body = children;
    let submitButton: ReactNode = null;
    if (submit !== undefined) {
        body = (
            <form id={formId} className={submit.formClassName} onSubmit={submit.onSubmit} noValidate>
                {children}
            </form>
        );
        submitButton = (
            <Button type="submit" form={formId} emphasis="strong">
                {submit.label}
            </Button>
        );
    }
    return (
        <Dialog.Root open={dialog.open} onOpenChange={dialog.onOpenChange} modal>
            <Dialog.Content
                ref={dialog.overlay.contentRef}
                container={dialog.overlay.container}
                maxWidth="400px"
                {...testIdProp}
            >
                <Dialog.Header>
                    <Dialog.Title>{title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>{body}</Dialog.Body>
                <Dialog.Footer>
                    <Button emphasis="default" onPress={() => dialog.finish('opener')}>
                        {cancel}
                    </Button>
                    {actions}
                    {submitButton}
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
};
