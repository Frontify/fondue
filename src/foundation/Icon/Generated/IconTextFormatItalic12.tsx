import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatItalic12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextFormatItalic12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.767 2.07c0 .207.167.375.375.375h.663L4.71 9.462h-.65a.375.375 0 0 0 0 .75h2.775a.375.375 0 0 0 0-.75H6.21l1.096-7.017h.613a.375.375 0 1 0 0-.75H5.142a.375.375 0 0 0-.375.375Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatItalic12);
export default Memo;
