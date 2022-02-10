import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStackVertical32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconStackVertical32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27.667 17.8c0 .847-.687 1.533-1.534 1.533H5.868A1.533 1.533 0 0 1 4.333 17.8v-3.6c0-.847.687-1.533 1.534-1.533h20.267c.846 0 1.533.686 1.533 1.533v3.6Zm-2-.467v-2.666H6.333v2.666h19.334Zm2-8.186c0 .847-.687 1.533-1.534 1.533H5.868a1.533 1.533 0 0 1-1.534-1.533v-3.6c0-.847.687-1.534 1.534-1.534h20.267c.846 0 1.533.687 1.533 1.534v3.6Zm-2-.467V6.013H6.333V8.68h19.334Zm2 17.774c0 .847-.687 1.533-1.534 1.533H5.868a1.533 1.533 0 0 1-1.534-1.533v-3.6c0-.847.687-1.533 1.534-1.533h20.267c.846 0 1.533.686 1.533 1.533v3.6Zm-2-.467v-2.666H6.333v2.666h19.334Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackVertical32);
export default Memo;
