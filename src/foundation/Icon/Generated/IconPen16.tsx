import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPen16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPen16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M9.046 12.977a.5.5 0 0 0 0 1h3.398a.5.5 0 1 0 0-1H9.046Z" />
                <path
                    fillRule="evenodd"
                    d="M10.39 2.177a1.167 1.167 0 0 1 1.65 0l1.746 1.746a1.167 1.167 0 0 1 0 1.65L5.388 13.97H1.993v-3.395l8.397-8.398Zm.943.707a.167.167 0 0 0-.235 0L2.993 10.99v1.981h1.98l8.106-8.105a.167.167 0 0 0 0-.235l-1.746-1.746Z"
                    clipRule="evenodd"
                />
                <path d="M2.67 12h1.333v1.333H2.669v-1.334Z" />
                <path
                    fillRule="evenodd"
                    d="m11.46 6.939-2.41-2.41.708-.707 2.41 2.41-.707.707Zm-3.934 6.538a.5.5 0 0 1 .5-.5h4.418a.5.5 0 0 1 0 1H8.026a.5.5 0 0 1-.5-.5Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPen16);
export default Memo;
