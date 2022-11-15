import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLinesTriangular24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLinesTriangular24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM5.998 12a.75.75 0 0 1 .75-.75h10.5a.75.75 0 1 1 0 1.5h-10.5a.75.75 0 0 1-.75-.75Zm3.752 4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLinesTriangular24);
