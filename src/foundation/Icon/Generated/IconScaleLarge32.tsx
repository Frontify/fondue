import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconScaleLarge32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconScaleLarge32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.744 4.4a3.077 3.077 0 0 0-3.077 3.077V25.94a3.076 3.076 0 0 0 3.077 3.076h20.513a3.076 3.076 0 0 0 3.076-3.076V7.477c0-1.7-1.377-3.077-3.076-3.077H5.743Zm15.384 2.051h-4.102v20.513h4.102V6.451Zm2.052 20.513h3.076c.567 0 1.026-.459 1.026-1.025V7.477c0-.566-.46-1.026-1.026-1.026H23.18v20.513ZM11.898 6.451h3.076v20.513h-3.076V6.451Zm-2.052 0H7.795v20.513h2.051V6.451Zm-4.102 0v20.513a1.025 1.025 0 0 1-1.026-1.025V7.477c0-.566.46-1.026 1.026-1.026Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleLarge32);
export default Memo;
