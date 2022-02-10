import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatUnderline12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextFormatUnderline12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M6.385 7.238h1.153v.77H4.462v-.77h1.153l.008-4.45H3.7v.769h-.77V2.018h6.155v1.539h-.77v-.77H6.393l-.007 4.45Z" />
                <path
                    fillRule="evenodd"
                    d="M2.125 9.586c0-.207.168-.375.375-.375h7a.375.375 0 1 1 0 .75h-7a.375.375 0 0 1-.375-.375Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatUnderline12);
export default Memo;
