/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as AddSimple } from "@components/Icon/Svg/AddSimple.svg";
import { merge } from "@utilities/merge";
import { MouseEvent, ReactElement } from "react";
import css from "./AddBlockButton.module.css";

export enum Orientation {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export type AddBlockButtonProps = {
    onClick: (e: MouseEvent) => void;
    title?: string;
    orientation?: Orientation;
};

export default function AddBlockButton({
    onClick,
    title,
    orientation = Orientation.Horizontal,
}: AddBlockButtonProps): ReactElement {
    return (
        <button
            data-test-id="add-block-button"
            className={merge([css.button, orientation === Orientation.Vertical && css.vertical])}
            onClick={onClick}
            title={title}
        >
            <AddSimple size={IconSize.Size16} />
        </button>
    );
}
