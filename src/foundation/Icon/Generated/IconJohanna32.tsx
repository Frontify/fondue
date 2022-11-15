import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconJohanna32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconJohanna32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10Zm2 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Zm-7 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm2 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconJohanna32);
