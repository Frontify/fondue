import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDotsHorizontal32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDotsHorizontal32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M25 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-9 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-7 2a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDotsHorizontal32);
