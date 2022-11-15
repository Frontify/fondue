import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMark12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCheckMark12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.73 2.646a.5.5 0 0 1 0 .708L4.477 9.607l-.354.353-.353-.353-2.278-2.279a.5.5 0 0 1 .707-.707l1.924 1.925 5.9-5.9a.5.5 0 0 1 .707 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMark12);
