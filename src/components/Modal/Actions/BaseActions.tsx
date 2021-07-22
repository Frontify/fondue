/* (c) Copyright Frontify Ltd., all rights reserved. */

import Button from "@elements/Button/Button";
import { Style } from "@utilities/enum";
import { ReactElement } from "react";
import css from "./BaseActions.module.css";

export type BaseActionsProps = {
    cancelText?: string;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function BaseActions({
    cancelText = "Cancel",
    confirmText = "Confirm",
    onCancel,
    onConfirm,
}: BaseActionsProps): ReactElement<BaseActionsProps> {
    return (
        <div className={css.actions} data-test-id="modal-base-actions">
            <div>
                <Button style={Style.Secondary} onClick={onCancel}>
                    {cancelText}
                </Button>
            </div>
            <div>
                <Button onClick={onConfirm}>{confirmText}</Button>
            </div>
        </div>
    );
}
