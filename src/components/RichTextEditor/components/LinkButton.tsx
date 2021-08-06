import React, { ReactElement, MouseEvent } from "react";
import IconLink from "@elements/Icon/Generated/IconLink";
import { IconSize } from "@elements/Icon/IconSize";

type LinkButtonProps = {
    onClick: () => void;
};

export const LinkButton = ({ onClick }: LinkButtonProps): ReactElement<LinkButtonProps> => {
    const showLinkChooser = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        onClick();
    };

    const preventBubblingUp = (event: MouseEvent): void => {
        event.preventDefault();
    };

    return (
        <button
            className="tw-flex tw-w-6 tw-h-6 tw-items-center tw-justify-center tw-border-0 tw-bg-white tw-rounded tw-text-black-95 tw-cursor-pointer"
            onClick={showLinkChooser}
            onMouseDown={preventBubblingUp}
        >
            <IconLink size={IconSize.Size16} />
        </button>
    );
};
