import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentArrowRight16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDocumentArrowRight16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M8.304 8.568a.502.502 0 0 0-.015.71l.562.606-2.795-.032a.52.52 0 0 0-.517.496c-.007.275.203.5.489.502l2.788.032-.627.582a.508.508 0 0 0-.024.71.5.5 0 0 0 .71 0l1.502-1.427a.527.527 0 0 0 .16-.354.496.496 0 0 0-.14-.36L9.015 8.576a.508.508 0 0 0-.71-.01Z" />
                <path
                    fillRule="evenodd"
                    d="M2.333 3.764a2.434 2.434 0 0 1 2.438-2.43h4.042c.333 0 .797.182 1.043.412l3.372 3.174c.242.229.439.683.439 1.019v6.3a2.428 2.428 0 0 1-2.431 2.428H4.764a2.433 2.433 0 0 1-2.431-2.43V3.764Zm6.18 3.21h4.123v5.455c0 .67-.545 1.212-1.212 1.212H4.576c-.67 0-1.212-.544-1.212-1.207V3.567c0-.667.543-1.208 1.22-1.208H8v4.103c0 .285.23.513.513.513Zm4.123-1.143v.118H9.03V2.456l3.607 3.375Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentArrowRight16);
export default Memo;
