import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDrops20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDrops20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM16 7A6 6 0 1 1 4 7a6 6 0 0 1 12 0ZM5 15.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75Zm2 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDrops20);
