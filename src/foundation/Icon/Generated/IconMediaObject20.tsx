import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObject20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMediaObject20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M9.653 3.333H4.33A2.664 2.664 0 0 0 1.667 6v8a2.664 2.664 0 0 0 2.662 2.667h5.324A2.665 2.665 0 0 0 12.316 14V6a2.665 2.665 0 0 0-2.663-2.667ZM2.998 6c0-.736.596-1.333 1.33-1.333h5.325c.736 0 1.332.597 1.332 1.333v8c0 .736-.596 1.333-1.332 1.333H4.33A1.332 1.332 0 0 1 2.998 14V6Z"
                    clipRule="evenodd"
                />
                <path d="M13.98 6.667a.666.666 0 0 1 0-1.334h3.688a.666.666 0 0 1 0 1.334H13.98Zm-.666 2c0 .368.298.666.666.666h2.356a.666.666 0 0 0 0-1.333H13.98a.666.666 0 0 0-.666.667Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMediaObject20);
export default Memo;
