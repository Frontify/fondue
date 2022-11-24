import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDotsHorizontal12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDotsHorizontal12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM6 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM1 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDotsHorizontal12);
