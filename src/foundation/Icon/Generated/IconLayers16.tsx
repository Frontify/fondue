import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayers16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLayers16"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M13.944 5.08 8.268 2.065a.566.566 0 0 0-.532 0L2.058 5.08a.603.603 0 0 0 .007 1.062l5.69 2.915a.566.566 0 0 0 .518 0l5.665-2.915a.603.603 0 0 0 .007-1.061ZM8.012 7.857l-4.408-2.26 4.398-2.332L12.4 5.6 8.012 7.858Z"
                    clipRule="evenodd"
                />
                <path d="M1.653 8.411a.603.603 0 0 1-.258-.8.573.573 0 0 1 .779-.264L8 10.357l5.826-3.01a.573.573 0 0 1 .779.265.603.603 0 0 1-.258.8l-6.08 3.14a.568.568 0 0 1-.534 0l-6.08-3.14Z" />
                <path d="M1.653 10.793a.603.603 0 0 1-.258-.8.573.573 0 0 1 .779-.264L8 12.738l5.826-3.01a.573.573 0 0 1 .779.265.603.603 0 0 1-.258.8l-6.08 3.14a.564.564 0 0 1-.533 0l-6.081-3.14Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLayers16);
export default Memo;
