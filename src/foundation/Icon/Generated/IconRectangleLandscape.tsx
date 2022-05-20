import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRectangleLandscape(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconRectangleLandscape"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M19 5.5H5A1.5 1.5 0 0 0 3.5 7v10A1.5 1.5 0 0 0 5 18.5h14a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 19 5.5ZM5 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconRectangleLandscape);
export default Memo;
