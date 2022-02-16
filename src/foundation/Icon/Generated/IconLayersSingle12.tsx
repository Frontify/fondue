import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayersSingle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLayersSingle12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.457 5.64 6.201 3.38a.425.425 0 0 0-.4 0L1.543 5.64a.452.452 0 0 0 .005.796l4.267 2.187a.425.425 0 0 0 .389 0l4.249-2.187a.452.452 0 0 0 .005-.796ZM6.01 7.724 2.703 6.029 6 4.28l3.298 1.752-3.29 1.693Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLayersSingle12);
export default Memo;
