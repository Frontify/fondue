import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMinus32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMinus32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.04 16.05a1 1 0 0 1 1-1h16a1 1 0 0 1 0 2h-16a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMinus32);
