import React, { ReactElement, MouseEvent } from "react";
import IconButton from "@elements/Icon/Generated/IconButton";
import { IconSize } from "@elements/Icon/IconSize";

type ButtonButtonProps = {
    onClick: () => void;
};

export default function ButtonButton({ onClick }: ButtonButtonProps): ReactElement<ButtonButtonProps> {
    const showButtonChooser = (event: MouseEvent): void => {
        event.preventDefault();
        onClick();
    };

    const preventBubblingUp = (event: MouseEvent): void => {
        event.preventDefault();
    };

    return (
        <button
            className="tw-flex tw-w-6 tw-h-6 tw-items-center tw-justify-center tw-border-0 tw-bg-white tw-rounded tw-text-black-95 tw-cursor-pointer"
            onClick={showButtonChooser}
            onMouseDown={preventBubblingUp}
        >
            <IconButton size={IconSize.Size16} />
        </button>
    );
}
