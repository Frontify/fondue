import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCarousel32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCarousel32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2ZM5 9a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Zm11 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-3-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm7.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCarousel32);
