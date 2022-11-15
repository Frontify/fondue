import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowSwap24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconArrowSwap24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.47 10.75a.75.75 0 0 0 1.06 1.06l3.536-3.535.53-.53-.53-.53-3.536-3.536a.75.75 0 1 0-1.06 1.06L18.73 7H3a.75.75 0 0 0 0 1.5h15.72l-2.25 2.25Zm-8.94 2.51L5.29 15.5H21a.75.75 0 1 1 0 1.5H5.26l2.27 2.27a.75.75 0 0 1-1.06 1.061l-3.536-3.535-.53-.53.53-.53L6.47 12.2a.75.75 0 1 1 1.06 1.06Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowSwap24);
