import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeading16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconHeading16"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6.667 9.554H5.469V7.231H3.198v2.323H2V4h1.198v2.222h2.271V4h1.198v5.554Zm-4.778 2.222a.556.556 0 1 1 0-1.11H14.11a.556.556 0 1 1 0 1.11H1.889Zm7.417-2.222h1.16V4h-1.16L8 4.932v1.103l1.25-.883h.056v4.402Z"
            />
        </svg>
    );
}

const Memo = memo(IconHeading16);
export default Memo;
