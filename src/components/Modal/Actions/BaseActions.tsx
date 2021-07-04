/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import Button, { ButtonStyle } from "@components/Button/Button";
import css from "./BaseActions.module.css";

export interface BaseActionsProps {
    cancelText?: string;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function BaseActions({
    cancelText = "Cancel",
    confirmText = "Confirm",
    onCancel,
    onConfirm,
}: BaseActionsProps): ReactElement<BaseActionsProps> {
    return (
        <div className={css.actions} data-test-id="modal-base-actions">
            <div>
                <Button style={ButtonStyle.Secondary} onClick={onCancel}>
                    {cancelText}
                </Button>
            </div>
            <div>
                <Button onClick={onConfirm}>{confirmText}</Button>
            </div>
        </div>
    );
}
