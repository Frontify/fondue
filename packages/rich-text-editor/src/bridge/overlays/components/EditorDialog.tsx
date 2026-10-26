/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog } from '@frontify/fondue-components';
import { type FormEvent, type ReactNode, useId } from 'react';

import { type EditorDialogControl } from '../hooks/useEditorDialog';

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
    dialog: EditorDialogControl;
    title: string;
    cancel: string;
    /** Wraps the body in a form that the footer's submit button sends, which `onSubmit` handles. */
    submit?: {
        label: string;
        onSubmit: (event: FormEvent) => void;
        formClassName?: string | undefined;
    };
    /** Buttons between Cancel and the submit button. */
    actions?: ReactNode;
    testId?: string;
    children: ReactNode;
}) => {
    const formId = useId();
    let testIdProp: { 'data-test-id'?: string } = {};
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
