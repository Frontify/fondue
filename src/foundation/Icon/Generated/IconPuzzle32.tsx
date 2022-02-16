import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPuzzle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPuzzle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M29.334 19.2a4.8 4.8 0 0 0-6.4-4.527V11.2A2.133 2.133 0 0 0 20.8 9.067h-3.473a4.8 4.8 0 1 0-9.053 0H4.8A2.133 2.133 0 0 0 2.667 11.2v16c0 1.178.955 2.133 2.133 2.133h5.388c.955 0 1.429-1.16.746-1.828a2.667 2.667 0 1 1 3.732 0c-.682.669-.208 1.828.747 1.828H20.8a2.133 2.133 0 0 0 2.134-2.133v-3.473a4.8 4.8 0 0 0 6.4-4.527ZM20.8 21.813V27.2h-3.473a4.8 4.8 0 1 0-9.053 0H4.8v-16h5.388c.955 0 1.428-1.16.746-1.829a2.667 2.667 0 1 1 3.732 0c-.682.67-.208 1.829.747 1.829H20.8v5.387c0 .956 1.16 1.43 1.829.747a2.667 2.667 0 1 1 0 3.732c-.669-.682-1.829-.209-1.829.747Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPuzzle32);
export default Memo;
