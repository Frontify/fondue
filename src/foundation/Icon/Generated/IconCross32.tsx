import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCross32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={46}
            height={46}
            className={customClassName}
            name="IconCross32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m23 24.438 6.469 6.468a1.016 1.016 0 1 0 1.437-1.437L24.438 23l6.468-6.469a1.016 1.016 0 1 0-1.437-1.437L23 21.563l-6.468-6.47a1.016 1.016 0 1 0-1.438 1.438L21.563 23l-6.469 6.469a1.016 1.016 0 1 0 1.438 1.437L23 24.438Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconCross32);
export default Memo;
