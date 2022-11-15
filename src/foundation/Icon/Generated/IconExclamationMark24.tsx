import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMark24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconExclamationMark24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.25 4v11.284a.75.75 0 0 0 1.5 0V4a.75.75 0 0 0-1.5 0ZM12 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconExclamationMark24);
