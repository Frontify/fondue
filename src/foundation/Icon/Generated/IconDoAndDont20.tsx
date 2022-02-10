import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDont20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDoAndDont20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M4.817 4.817a.595.595 0 0 0 0 .842l.59.59-.59.588a.595.595 0 0 0 .842.842l.59-.59.588.59a.595.595 0 1 0 .842-.842l-.59-.589.59-.59a.595.595 0 1 0-.842-.841l-.589.59-.59-.59a.595.595 0 0 0-.841 0Z" />
                <path
                    fillRule="evenodd"
                    d="M6.13 10.595a4.464 4.464 0 1 1 0-8.929 4.464 4.464 0 0 1 0 8.93Zm0-1.19a3.274 3.274 0 1 0 0-6.548 3.274 3.274 0 0 0 0 6.548Z"
                    clipRule="evenodd"
                />
                <path d="M15.89 12.549a.595.595 0 0 0-.841.013l-1.666 1.718-.438-.494a.595.595 0 1 0-.89.79l.863.974c.23.26.632.27.873.02l2.112-2.18a.595.595 0 0 0-.013-.841Z" />
                <path
                    fillRule="evenodd"
                    d="M9.405 13.869a4.464 4.464 0 1 0 8.928 0 4.464 4.464 0 0 0-8.928 0Zm4.464 3.274a3.274 3.274 0 1 0 0-6.548 3.274 3.274 0 0 0 0 6.548Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDont20);
export default Memo;
