import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMoneyCircle32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMoneyCircle32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 29.333c7.364 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.333-13.333-13.333C8.636 2.667 2.666 8.637 2.666 16c0 7.364 5.97 13.333 13.334 13.333Zm.812-6.92v1.92h-1.815v-1.956c-1.66-.296-2.818-1.329-3.164-3.009l2.023-.553c.121 1.015 1.107 1.66 2.265 1.66 1.106 0 1.78-.627 1.78-1.66 0-1.178-1.094-1.48-2.34-1.826-1.646-.455-3.555-.983-3.555-3.693 0-1.938 1.176-3.304 2.991-3.673V7.667h1.815v1.92c1.677.258 2.836 1.31 3.164 2.823l-2.074.646c-.173-.904-.9-1.513-1.954-1.513-1.02 0-1.643.516-1.643 1.495 0 1.177 1.09 1.483 2.328 1.832 1.636.46 3.534.995 3.534 3.705 0 2.03-1.35 3.525-3.355 3.839Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMoneyCircle32Filled);
export default Memo;
