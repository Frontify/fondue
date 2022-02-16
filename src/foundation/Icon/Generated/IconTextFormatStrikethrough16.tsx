import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextFormatStrikethrough16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextFormatStrikethrough16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M10.052 12.257H8.513V9.629H7.487v2.628H5.95v1.025h4.103v-1.025Z" />
                <path
                    fillRule="evenodd"
                    d="M2.833 8a.5.5 0 0 1 .5-.5h9.334a.5.5 0 1 1 0 1H3.333a.5.5 0 0 1-.5-.5Z"
                    clipRule="evenodd"
                />
                <path d="M7.498 6.258h1.004V3.744h3.161v1.025h1.004V2.718H3.333v2.051h1.004V3.744h3.161v2.514Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatStrikethrough16);
export default Memo;
