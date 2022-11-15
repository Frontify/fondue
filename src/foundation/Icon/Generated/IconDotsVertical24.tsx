import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDotsVertical24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDotsVertical24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.5 5.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm1.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDotsVertical24);
