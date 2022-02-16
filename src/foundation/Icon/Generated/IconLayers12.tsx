import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLayers12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLayers12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10.458 3.81 6.201 1.55a.425.425 0 0 0-.399 0L1.544 3.809a.452.452 0 0 0 .005.796l4.267 2.187a.425.425 0 0 0 .389 0l4.248-2.186a.452.452 0 0 0 .005-.796ZM6.01 5.893 2.703 4.2l3.299-1.75L9.3 4.2 6.01 5.893Z"
                    clipRule="evenodd"
                />
                <path d="M1.24 6.308a.452.452 0 0 1-.194-.6.43.43 0 0 1 .584-.198L6 7.767l4.37-2.257a.43.43 0 0 1 .584.199.452.452 0 0 1-.194.6L6.2 8.663a.43.43 0 0 1-.4 0L1.24 6.308Z" />
                <path d="M1.24 8.095a.452.452 0 0 1-.194-.6.43.43 0 0 1 .584-.198L6 9.554l4.37-2.257a.43.43 0 0 1 .584.198.452.452 0 0 1-.194.6L6.2 10.45a.422.422 0 0 1-.4 0L1.24 8.095Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLayers12);
export default Memo;
