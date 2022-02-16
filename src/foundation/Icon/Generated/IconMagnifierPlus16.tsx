import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMagnifierPlus16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMagnifierPlus16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M9.224 6.82H8.087V5.655a.667.667 0 0 0-1.333 0V6.82H5.617a.667.667 0 1 0 0 1.333h1.137V9.32a.667.667 0 0 0 1.333 0V8.154h1.137a.667.667 0 1 0 0-1.333Z" />
                <path
                    fillRule="evenodd"
                    d="M1.333 7.487c0 3.399 2.726 6.154 6.088 6.154a6.021 6.021 0 0 0 3.815-1.358.684.684 0 0 0 .12.149l2.173 2.05a.671.671 0 0 0 .956-.032.69.69 0 0 0-.033-.967l-2.174-2.051a.687.687 0 0 0-.114-.087 6.17 6.17 0 0 0 1.344-3.858c0-3.398-2.725-6.154-6.087-6.154-3.362 0-6.088 2.756-6.088 6.154Zm10.822 0c0 2.644-2.12 4.787-4.734 4.787-2.615 0-4.735-2.143-4.735-4.787 0-2.643 2.12-4.786 4.735-4.786 2.614 0 4.734 2.143 4.734 4.786Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconMagnifierPlus16);
export default Memo;
