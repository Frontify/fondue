import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatItalic16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextFormatItalic16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.355 2.76a.5.5 0 0 0 .5.5h.885l-1.46 9.356h-.87a.5.5 0 1 0 0 1h3.701a.5.5 0 0 0 0-1H8.28L9.74 3.26h.817a.5.5 0 1 0 0-1H6.855a.5.5 0 0 0-.5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatItalic16);
export default Memo;
