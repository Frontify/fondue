import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentText20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDocumentText20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5.96 14.545a.76.76 0 0 0 .762.758h6.849a.76.76 0 0 0 .76-.758.76.76 0 0 0-.76-.757H6.72a.76.76 0 0 0-.76.757Zm.762-2.272a.76.76 0 0 1-.761-.758.76.76 0 0 1 .76-.758h6.85c.42 0 .76.34.76.758a.76.76 0 0 1-.76.758H6.72ZM5.96 8.485a.76.76 0 0 0 .762.757h1.141a.76.76 0 0 0 .761-.757.76.76 0 0 0-.76-.758H6.721a.76.76 0 0 0-.761.758Z" />
                <path
                    fillRule="evenodd"
                    d="M5.49 1.667a2.574 2.574 0 0 0-2.574 2.567v11.531a2.572 2.572 0 0 0 2.582 2.568h9.003c1.423 0 2.582-1.146 2.582-2.56V7.31c0-.355-.21-.842-.471-1.087l-4.37-4.113c-.263-.247-.76-.443-1.115-.443H5.489Zm5.15 7.05h5.155v7.058a1.28 1.28 0 0 1-1.284 1.276H5.489a1.28 1.28 0 0 1-1.285-1.276V4.225c0-.705.581-1.276 1.292-1.276H10v5.128a.64.64 0 0 0 .64.64Zm5.155-1.281v-.148l-4.507-4.219v4.367h4.507Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentText20);
export default Memo;
