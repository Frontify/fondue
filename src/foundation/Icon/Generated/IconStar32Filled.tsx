import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStar32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconStar32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="m7.76 28.028 1.573-9.176-6.667-6.498 9.214-1.339L16 2.667l4.12 8.348 9.213 1.339-6.666 6.498 1.573 9.176L16 23.696l-8.24 4.332Z"
            />
        </svg>
    );
}

const Memo = memo(IconStar32Filled);
export default Memo;
