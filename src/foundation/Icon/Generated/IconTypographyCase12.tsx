import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyCase12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTypographyCase12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5.643 7.971V5.446h-.91v.462H4.02v-1.17h3.962v1.17h-.715v-.462h-.909V7.97h.621v.708H5.022V7.97h.62Z" />
                <path
                    fillRule="evenodd"
                    d="M4.929 1.75H7.07a.71.71 0 0 1 .715.707v.71h2.5c.394 0 .714.317.714.708v5.667c0 .39-.32.708-.714.708H1.714A.711.711 0 0 1 1 9.542V3.875c0-.391.32-.708.714-.708h2.5v-.71c0-.39.32-.707.715-.707ZM1.714 9.542V3.875h8.572v5.667H1.714ZM4.93 3.167v-.709h2.14v.709H4.93Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyCase12);
export default Memo;
