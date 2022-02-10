import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListCheck20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconListCheck20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.5 4.792c0 .345-.28.625-.625.625H9.792a.625.625 0 1 1 0-1.25h7.083c.345 0 .625.28.625.625ZM9.167 15.208c0-.345.28-.625.625-.625h5.416a.625.625 0 1 1 0 1.25H9.792a.625.625 0 0 1-.625-.625Zm6.666-6.964c0 .345-.28.625-.625.625H9.792a.625.625 0 0 1 0-1.25h5.416c.345 0 .625.28.625.625Zm1.667 3.467c0 .345-.28.625-.625.625H9.792a.625.625 0 1 1 0-1.25h7.083c.345 0 .625.28.625.625ZM4.7 7.55l-.805-.947a.625.625 0 0 0-.952.81L4.18 8.87a.792.792 0 0 0 1.3-.136L7.42 5.15a.625.625 0 1 0-1.1-.595L4.7 7.55Zm-.95 4.533v2.5h2.5v-2.5h-2.5Zm-.417-1.25a.833.833 0 0 0-.833.834V15c0 .46.373.833.833.833h3.334c.46 0 .833-.373.833-.833v-3.333a.833.833 0 0 0-.833-.834H3.333Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListCheck20);
export default Memo;
