import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPause32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPause32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M8 5.333c-.737 0-1.333.597-1.333 1.334v18.666c0 .737.596 1.334 1.333 1.334h5.333c.737 0 1.333-.597 1.333-1.334V6.667c0-.737-.596-1.334-1.333-1.334H8Zm10.666 0c-.736 0-1.333.597-1.333 1.334v18.666c0 .737.597 1.334 1.334 1.334H24c.736 0 1.333-.597 1.333-1.334V6.667c0-.737-.597-1.334-1.333-1.334h-5.334Z"
            />
        </svg>
    );
}

const Memo = memo(IconPause32Filled);
export default Memo;
