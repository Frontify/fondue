import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayersSingle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLayersSingle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.943 7.52 8.267 4.507a.566.566 0 0 0-.532 0L2.057 7.519a.603.603 0 0 0 .007 1.062l5.69 2.916a.566.566 0 0 0 .518 0l5.665-2.916a.603.603 0 0 0 .007-1.061Zm-5.932 2.778L3.603 8.04l4.398-2.333L12.4 8.041l-4.388 2.257Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLayersSingle16);
export default Memo;
