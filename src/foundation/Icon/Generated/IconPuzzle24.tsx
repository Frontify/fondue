import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPuzzle24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPuzzle24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22 14.4a3.6 3.6 0 0 0-4.8-3.395V8.4a1.6 1.6 0 0 0-1.6-1.6h-2.605a3.6 3.6 0 1 0-6.79 0H3.6A1.6 1.6 0 0 0 2 8.4v12A1.6 1.6 0 0 0 3.6 22h4.04a.8.8 0 0 0 .56-1.371 2 2 0 1 1 2.8 0A.8.8 0 0 0 11.56 22h4.04a1.6 1.6 0 0 0 1.6-1.6v-2.605A3.6 3.6 0 0 0 22 14.4Zm-6.4 1.96v4.04h-2.605a3.6 3.6 0 1 0-6.79 0H3.6v-12h4.04a.8.8 0 0 0 .56-1.371 2 2 0 1 1 2.8 0 .8.8 0 0 0 .56 1.371h4.04v4.04a.8.8 0 0 0 1.371.56 2 2 0 1 1 0 2.8.8.8 0 0 0-1.371.56Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPuzzle24);
export default Memo;
