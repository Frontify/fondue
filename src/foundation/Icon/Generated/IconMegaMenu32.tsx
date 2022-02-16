import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMegaMenu32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMegaMenu32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M25 7H7a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V10a3 3 0 0 0-3-3ZM6 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V10Zm3 3.5a1 1 0 1 1 0-2h5a1 1 0 1 1 0 2H9Zm8-1a1 1 0 0 0 1 1h4.657a1 1 0 1 0 0-2H18a1 1 0 0 0-1 1Zm-8 5a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2H9Zm8-1a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1Zm-8 5a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2H9Zm8-1a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMegaMenu32);
export default Memo;
