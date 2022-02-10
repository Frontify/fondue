import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayersSingle24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLayersSingle24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m20.915 11.28-8.514-4.52a.85.85 0 0 0-.798 0l-8.518 4.52a.904.904 0 0 0 .01 1.593l8.535 4.373a.85.85 0 0 0 .777 0l8.498-4.373a.905.905 0 0 0 .01-1.592Zm-8.898 4.168-6.612-3.39 6.597-3.499 6.597 3.502-6.582 3.386Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLayersSingle24);
export default Memo;
