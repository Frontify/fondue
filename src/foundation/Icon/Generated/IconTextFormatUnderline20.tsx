import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatUnderline20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTextFormatUnderline20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M10.64 12.063h1.924v1.282H7.436v-1.282h1.923l.013-7.417H6.167v1.282H4.885V3.364H15.14v2.564h-1.28V4.646h-3.205l-.013 7.417Z" />
                <path
                    fillRule="evenodd"
                    d="M3.542 15.977c0-.345.28-.625.625-.625h11.666a.625.625 0 0 1 0 1.25H4.167a.625.625 0 0 1-.625-.625Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatUnderline20);
export default Memo;
