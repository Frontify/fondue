import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlay20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlay20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3.703 16.249V3.8a1 1 0 0 1 1.48-.878l11.454 6.254a1 1 0 0 1-.003 1.758L5.179 17.128a1 1 0 0 1-1.476-.88Z"
            />
        </svg>
    );
}
export default memo(IconPlay20Filled);
