import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMusicNote12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMusicNote12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.75 3.728v4.957a.412.412 0 0 1-.005.066 1.867 1.867 0 0 1-1.87 2A1.867 1.867 0 0 1 1 8.89c0-1.026.84-1.858 1.875-1.858.385 0 .744.115 1.042.313V1.663c0-.228.186-.413.416-.413h6.25c.23 0 .417.185.417.413v7.022a.41.41 0 0 1-.005.066 1.867 1.867 0 0 1-1.87 2A1.867 1.867 0 0 1 7.25 8.89c0-1.026.84-1.858 1.875-1.858.385 0 .744.115 1.042.313V3.728H4.75Zm0-.826h5.417v-.826H4.75v.826Zm-.833 5.99c0 .57-.467 1.032-1.042 1.032A1.037 1.037 0 0 1 1.833 8.89c0-.57.467-1.032 1.042-1.032s1.042.462 1.042 1.032Zm6.25 0c0 .57-.467 1.032-1.042 1.032A1.037 1.037 0 0 1 8.083 8.89c0-.57.467-1.032 1.042-1.032s1.042.462 1.042 1.032Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMusicNote12);
export default Memo;
