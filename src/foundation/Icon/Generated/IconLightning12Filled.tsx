import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightning12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLightning12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M2.292 6.954h3.176l-1.474 3.645a.292.292 0 0 0 .47.323l5.803-5.403a.292.292 0 0 0-.199-.505h-3.39L8.07 1.397a.292.292 0 0 0-.476-.314l-5.507 5.37a.292.292 0 0 0 .204.5Z"
            />
        </svg>
    );
}

const Memo = memo(IconLightning12Filled);
export default Memo;
