import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLollipop32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLollipop32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M23 12v7.8a2.2 2.2 0 0 1-2.2 2.2h-9.6A2.2 2.2 0 0 1 9 19.8V12a7 7 0 1 1 14 0ZM13 24h-1.8A4.2 4.2 0 0 1 7 19.8V12a9 9 0 1 1 18 0v7.8a4.2 4.2 0 0 1-4.2 4.2H19v2a3 3 0 1 1-6 0v-2Zm2 0v2a1 1 0 1 0 2 0v-2h-2Zm-2-14a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0v-8a1 1 0 0 1 1-1Zm7 1a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLollipop32);
