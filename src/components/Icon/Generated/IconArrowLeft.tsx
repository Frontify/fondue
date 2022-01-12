import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconArrowLeft(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            <path d="m5.502 13.03 5.428 5.43a1.026 1.026 0 1 1-1.45 1.45L2.3 12.73c-.4-.4-.4-1.05 0-1.45L9.48 4.1a1.026 1.026 0 1 1 1.45 1.45l-5.428 5.43h15.472a1.026 1.026 0 1 1 0 2.05H5.502Z" />
        </svg>
    );
}

const Memo = memo(IconArrowLeft);
export default Memo;
