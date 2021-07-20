/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as AddSimple } from "@components/Icon/Svg/AddSimple.svg";
import { MouseEvent, ReactElement } from "react";
import css from "./AddBlockButton.module.css";

export type AddBlockButtonProps = {
    onClick: (e: MouseEvent) => void;
    title?: string;
};

export default function AddBlockButton({ onClick, title }: AddBlockButtonProps): ReactElement {
    return (
        <button data-test-id="add-block-button" className={css.button} onClick={onClick} title={title}>
            <AddSimple size={IconSize.Size16} />
        </button>
    );
}
