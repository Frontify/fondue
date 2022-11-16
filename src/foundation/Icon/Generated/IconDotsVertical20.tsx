import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDotsVertical20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDotsVertical20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.5 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 5.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm1.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDotsVertical20);
