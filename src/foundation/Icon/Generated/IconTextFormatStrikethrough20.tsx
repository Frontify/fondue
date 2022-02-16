import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextFormatStrikethrough20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTextFormatStrikethrough20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M12.564 15.32h-1.923v-3.284H9.359v3.285H7.436v1.282h5.128V15.32Z" />
                <path
                    fillRule="evenodd"
                    d="M3.542 10c0-.345.28-.625.625-.625h11.666a.625.625 0 0 1 0 1.25H4.167A.625.625 0 0 1 3.542 10Z"
                    clipRule="evenodd"
                />
                <path d="M9.373 7.822h1.254V4.68h3.952v1.282h1.254V3.397H4.167v2.565H5.42V4.68h3.952v3.142Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatStrikethrough20);
export default Memo;
