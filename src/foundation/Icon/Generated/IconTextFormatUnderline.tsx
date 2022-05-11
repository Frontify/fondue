import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatUnderline(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTextFormatUnderline"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.75 4H5v3.35a.75.75 0 0 0 1.5 0V5.5H11v9H9.1a.75.75 0 0 0 0 1.5h5.433a.75.75 0 0 0 0-1.5H12.5v-9H17v1.85a.75.75 0 0 0 1.5 0V4H5.75ZM5.5 18.5a.75.75 0 0 0 0 1.5H18a.75.75 0 0 0 0-1.5H5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatUnderline);
export default Memo;
