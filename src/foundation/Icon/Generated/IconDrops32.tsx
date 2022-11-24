import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDrops32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDrops32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M23 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm2 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM8 24a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm3 4a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDrops32);
