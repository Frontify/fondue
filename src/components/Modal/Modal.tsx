/* (c) Copyright Frontify Ltd., all rights reserved. */

import useClickOutside from "@hooks/useClickOutside";
import { ReactElement, useState } from "react";
import css from "./Modal.module.css";

export enum ModalPatternColor {
    Violet = "Violet",
    Green = "Green",
    Yellow = "Yellow",
    Red = "Red",
}

export interface ModalProps {
    pattern?: boolean;
    patternColor?: ModalPatternColor;
    title: string;
    content: ReactElement | ReactElement[] | string;
    actions: ReactElement | ReactElement[] | string;
    onClickedOutside?: () => void;
}

export default function Modal({
    pattern = true,
    patternColor = ModalPatternColor.Violet,
    title,
    content,
    actions,
    onClickedOutside,
}: ModalProps): ReactElement<ModalProps> {
    const [modalElement, setModalElement] = useState<HTMLDivElement | null>(null);

    const modalClasses = [css.modal, ...(pattern ? [css.withPattern] : [])].join(" ");

    if (onClickedOutside) {
        useClickOutside(modalElement, () => {
            onClickedOutside();
        });
    }

    const patternClasses = [css.pattern, css[`patternColor${patternColor}`]].join(" ");

    return (
        <div className={css.container} data-test-id="modal-container">
            <div ref={setModalElement} className={modalClasses} data-test-id="modal">
                {pattern && <div className={patternClasses} data-test-id="modal-pattern"></div>}
                <div className={css.body} data-test-id="modal-body">
                    <h1 className={css.title} data-test-id="modal-title">
                        {title}
                    </h1>
                    <div className={css.content} data-test-id="modal-content">
                        {content}
                    </div>
                    <div className={css.actions} data-test-id="modal-actions">
                        {actions}
                    </div>
                </div>
            </div>
        </div>
    );
}
