import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlay32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlay32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M7.002 24.38V7.62a1 1 0 0 1 1.448-.895l16.736 8.38a1 1 0 0 1 0 1.79L8.45 25.274a1 1 0 0 1-1.448-.894Z"
            />
        </svg>
    );
}
export default memo(IconPlay32Filled);
