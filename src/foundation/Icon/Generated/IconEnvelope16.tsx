import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEnvelope16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconEnvelope16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.333 4c0-.737.597-1.333 1.334-1.333h10.666c.737 0 1.334.596 1.334 1.333v8c0 .736-.597 1.333-1.334 1.333H2.667A1.333 1.333 0 0 1 1.333 12V4Zm11.626-.333H2.851l4.554 4.396a.833.833 0 0 0 1.168-.01l4.386-4.387Zm-10.626 7.96L5.93 8.028 2.333 4.557v7.07ZM6.65 8.723l-3.609 3.61h9.92L9.333 8.706l-.053.053a1.833 1.833 0 0 1-2.57.023l-.06-.059Zm7.018-4.35v7.252L10.04 8l3.627-3.626Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconEnvelope16);
export default Memo;
