import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLinesTriangular16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLinesTriangular16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 4.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5ZM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8Zm2.5 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLinesTriangular16);
