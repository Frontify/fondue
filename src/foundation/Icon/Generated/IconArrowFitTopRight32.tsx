import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowFitTopRight32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowFitTopRight32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M23.004 5a4 4 0 0 1 4 4v11.5a1 1 0 1 1-2 0V9c0-.18-.024-.353-.069-.519L8.413 25.003h7.244a1 1 0 1 1 0 2H5V16.347l1-.001h1v7.243l16.52-16.52A2.002 2.002 0 0 0 23.005 7h-11.5a1 1 0 1 1 0-2h11.5ZM6 16.346H5a1 1 0 1 1 2 0H6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowFitTopRight32);
