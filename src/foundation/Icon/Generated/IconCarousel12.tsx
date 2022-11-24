import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCarousel12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCarousel12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.5 2h7a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5ZM1 2.5A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5v5A1.5 1.5 0 0 1 9.5 9h-7A1.5 1.5 0 0 1 1 7.5v-5ZM6 11a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm-1.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM8 11a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCarousel12);
