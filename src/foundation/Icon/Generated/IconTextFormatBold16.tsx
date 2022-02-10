import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatBold16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextFormatBold16"
            {...props}
        >
            <path
                fill="currentColor"
                d="M11.659 5.562c0-1.798-1.333-2.895-3.783-2.895H4v10.666h3.938c2.713 0 4.062-1.082 4.062-3.123 0-1.158-.713-2.195-2.264-2.347 1.256-.183 1.923-1.189 1.923-2.301Zm-5.21-.716h1.194c1.101 0 1.489.472 1.489 1.036 0 .625-.388 1.036-1.225 1.036H6.45V4.846Zm3.04 5.196c0 .731-.559 1.128-1.582 1.128H6.45V8.93h1.44c1.101 0 1.597.35 1.597 1.112Z"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatBold16);
export default Memo;
