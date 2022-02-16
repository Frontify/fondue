import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeading24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconHeading24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M10 14.331H8.204v-3.485H4.796v3.485H3V6h1.796v3.333h3.408V6H10v8.331Zm-7.167 3.334a.833.833 0 0 1 0-1.667h18.334a.833.833 0 0 1 0 1.667H2.833Zm11.127-3.334h1.74V6h-1.74L12 7.398v1.654l1.874-1.325h.085v6.604Z"
            />
        </svg>
    );
}

const Memo = memo(IconHeading24);
export default Memo;
