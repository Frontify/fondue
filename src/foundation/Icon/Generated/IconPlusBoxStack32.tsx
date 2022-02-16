import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlusBoxStack32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlusBoxStack32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M14.435 21.74a1.044 1.044 0 0 1-2.087 0v-2.088H10.26a1.043 1.043 0 0 1 0-2.087h2.087v-2.087a1.044 1.044 0 0 1 2.087 0v2.087h2.087a1.044 1.044 0 0 1 0 2.087h-2.087v2.087Z" />
                <path
                    fillRule="evenodd"
                    d="M24.686 4H12.532a3.315 3.315 0 0 0-3.315 3.315v1.902H7.315A3.315 3.315 0 0 0 4 12.532v12.153A3.315 3.315 0 0 0 7.315 28h12.153a3.315 3.315 0 0 0 3.315-3.315v-1.902h1.902A3.315 3.315 0 0 0 28 19.468V7.315A3.315 3.315 0 0 0 24.686 4Zm-1.903 8.532v8.04h1.903c.61 0 1.104-.494 1.104-1.104V7.315c0-.61-.494-1.105-1.104-1.105H12.532c-.61 0-1.105.494-1.105 1.105v1.902h8.041a3.315 3.315 0 0 1 3.315 3.315Zm-16.696-.104c0-.62.503-1.124 1.124-1.124h12.36c.621 0 1.125.503 1.125 1.124V24.79c0 .62-.504 1.124-1.124 1.124H7.21a1.124 1.124 0 0 1-1.124-1.124V12.43Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlusBoxStack32);
export default Memo;
