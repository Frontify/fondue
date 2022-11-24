import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowExpand32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowExpand32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.5 5a1 1 0 1 0 0 2h6.086l-6.293 6.293a1 1 0 0 0 1.414 1.414L25 8.414V14.5l1 .001h-1a1 1 0 1 0 2 0h-1 1V5h-9.5Zm-2.793 12.293a1 1 0 0 1 0 1.414L8.414 25H14.5a1 1 0 1 1 0 2H5v-9.5h2v6.087l6.293-6.293a1 1 0 0 1 1.414 0ZM6 17.5H5a1 1 0 1 1 2 0H6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowExpand32);
