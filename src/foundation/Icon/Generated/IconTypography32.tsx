import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTypography32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTypography32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 6h18v3a1 1 0 1 1-2 0V8h-6v16h2a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2h2V8H9v1a1 1 0 0 1-2 0V6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTypography32);
