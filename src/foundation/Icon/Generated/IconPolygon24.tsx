import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPolygon24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPolygon24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.18 21.5 22 9.757 12 2.5 2 9.757 5.82 21.5h12.36ZM7.003 19.872 3.915 10.38 12 4.512l8.084 5.867-3.087 9.493H7.003Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPolygon24);
export default Memo;
