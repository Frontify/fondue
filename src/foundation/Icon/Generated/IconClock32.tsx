import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconClock32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconClock32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10Zm2 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Zm-8.027 1a1 1 0 1 0 0-2H17V9.847a1 1 0 1 0-2 0V17h4.973Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconClock32);
