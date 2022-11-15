import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCarousel20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCarousel20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.5 3.5h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1ZM2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 11.5v-7ZM10 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-9 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCarousel20);
