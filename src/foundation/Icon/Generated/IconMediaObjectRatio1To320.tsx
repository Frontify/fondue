import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectRatio1To320(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMediaObjectRatio1To320"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.5 4.583H3a.083.083 0 0 0-.083.084v10.666c0 .046.037.084.083.084h1.5a.083.083 0 0 0 .083-.084V4.667a.083.083 0 0 0-.083-.084ZM3 3.333c-.737 0-1.333.597-1.333 1.334v10.666c0 .737.596 1.334 1.333 1.334h1.5c.736 0 1.333-.597 1.333-1.334V4.667c0-.737-.597-1.334-1.333-1.334H3Zm15.333 1.459c0 .345-.28.625-.625.625H8.125a.625.625 0 1 1 0-1.25h9.583c.345 0 .625.28.625.625Zm0 5c0 .345-.28.625-.625.625H8.125a.625.625 0 1 1 0-1.25h9.583c.345 0 .625.28.625.625Zm-2.5-2.5c0 .345-.28.625-.625.625H8.125a.625.625 0 1 1 0-1.25h7.083c.345 0 .625.28.625.625Zm0 5c0 .345-.28.625-.625.625H8.125a.625.625 0 1 1 0-1.25h7.083c.345 0 .625.28.625.625Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectRatio1To320);
export default Memo;
