import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedHeight32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFixedHeight32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M24.3 6a1 1 0 0 1-1 1H8.7a1 1 0 1 1 0-2h14.6a1 1 0 0 1 1 1ZM16 21.502a1 1 0 0 1-1-1v-9a1 1 0 1 1 2 0v9a1 1 0 0 1-1 1Zm7.3 5.501a1 1 0 1 0 0-2H8.7a1 1 0 1 0 0 2h14.6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedHeight32);
