import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTrashBin20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTrashBin20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M7.295 8.485a.758.758 0 0 1 1.516 0v6.06a.758.758 0 1 1-1.516 0v-6.06Zm4.545-.758a.758.758 0 0 0-.757.758v6.06a.758.758 0 0 0 1.515 0v-6.06a.758.758 0 0 0-.757-.758Z" />
                <path
                    fillRule="evenodd"
                    d="M11.462 1.667h-3.03c-.837 0-1.515.678-1.515 1.515v1.515h-3.41a.758.758 0 1 0 0 1.515h.38v9.849a2.273 2.273 0 0 0 2.272 2.272h7.576a2.273 2.273 0 0 0 2.273-2.272V6.212h.527a.758.758 0 0 0 0-1.515h-3.558V3.182c0-.837-.678-1.515-1.515-1.515Zm-6.06 4.545h9.09v9.849a.757.757 0 0 1-.757.757H6.159a.758.758 0 0 1-.757-.757V6.212Zm3.03-1.515V3.182h3.03v1.515h-3.03Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTrashBin20);
export default Memo;
