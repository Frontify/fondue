import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDotsHorizontal16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDotsHorizontal16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM3 8a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDotsHorizontal16);
