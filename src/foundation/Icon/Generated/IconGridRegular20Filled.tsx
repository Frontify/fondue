import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconGridRegular20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconGridRegular20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.833 10.833c-.736 0-1.333.597-1.333 1.334v4c0 .736.597 1.333 1.333 1.333h4c.737 0 1.334-.597 1.334-1.333v-4c0-.737-.597-1.334-1.334-1.334h-4Zm8.334 0c-.737 0-1.334.597-1.334 1.334v4c0 .736.597 1.333 1.334 1.333h4c.736 0 1.333-.597 1.333-1.333v-4c0-.737-.597-1.334-1.333-1.334h-4Zm0-8.333c-.737 0-1.334.597-1.334 1.333v4c0 .737.597 1.334 1.334 1.334h4c.736 0 1.333-.597 1.333-1.334v-4c0-.736-.597-1.333-1.333-1.333h-4Zm-8.334 0c-.736 0-1.333.597-1.333 1.333v4c0 .737.597 1.334 1.333 1.334h4c.737 0 1.334-.597 1.334-1.334v-4c0-.736-.597-1.333-1.334-1.333h-4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconGridRegular20Filled);
export default Memo;
