import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconScaleSmall16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconScaleSmall16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.64 5.2H2.36c-.567 0-1.026.46-1.026 1.026v3.59c0 .566.46 1.025 1.026 1.025h11.28c.566 0 1.026-.46 1.026-1.026v-3.59c0-.566-.46-1.025-1.026-1.025ZM2.36 9.815v-3.59h4.615v3.59H2.36Zm5.64 0v-3.59h3.078v3.59H8Zm4.103 0h1.539v-3.59h-1.539v3.59Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleSmall16);
export default Memo;
