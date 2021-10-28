import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowLeft(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconArrowLeft"
            {...props}
        >
            <path d="M5.502 13.03l5.428 5.43a1.026 1.026 0 11-1.45 1.45L2.3 12.73c-.4-.4-.4-1.05 0-1.45L9.48 4.1a1.026 1.026 0 111.45 1.45l-5.428 5.43h15.472a1.026 1.026 0 110 2.05H5.502z" />
        </svg>
    );
}

const MemoIconArrowLeft = React.memo(IconArrowLeft);
export default MemoIconArrowLeft;
