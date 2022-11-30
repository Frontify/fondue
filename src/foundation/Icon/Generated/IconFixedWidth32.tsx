import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedWidth32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFixedWidth32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.998 7.7a1 1 0 0 1 1 1v14.6a1 1 0 1 1-2 0V8.7a1 1 0 0 1 1-1ZM21.5 16a1 1 0 0 1-1 1h-9a1 1 0 1 1 0-2h9a1 1 0 0 1 1 1ZM27 8.7a1 1 0 1 0-2 0v14.6a1 1 0 1 0 2 0V8.7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedWidth32);
