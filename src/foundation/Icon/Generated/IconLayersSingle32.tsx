import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayersSingle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLayersSingle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27.887 15.04 16.535 9.014a1.132 1.132 0 0 0-1.065 0L4.114 15.038a1.206 1.206 0 0 0 .014 2.123l11.378 5.832a1.13 1.13 0 0 0 1.037 0l11.33-5.83a1.207 1.207 0 0 0 .013-2.123Zm-11.864 5.557-8.816-4.519 8.795-4.666 8.796 4.67-8.775 4.515Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLayersSingle32);
export default Memo;
