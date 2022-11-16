import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCross16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCross16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.464 3.758a.5.5 0 0 0-.707.707l3.536 3.536-3.535 3.535a.5.5 0 1 0 .707.707L8 8.708l3.535 3.535a.5.5 0 0 0 .707-.707L8.707 8.001l3.536-3.536a.5.5 0 1 0-.707-.707L8 7.294 4.464 3.758Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCross16);
