import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlay16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlay16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M2.525 12.482V3.488a1 1 0 0 1 1.445-.895l9.097 4.518a1 1 0 0 1-.003 1.793L3.967 13.38a1 1 0 0 1-1.442-.897Z"
            />
        </svg>
    );
}
export default memo(IconPlay16Filled);
