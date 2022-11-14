import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleSmall32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconScaleSmall32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22 12h-6v8h6v-8Zm2 0v8h2a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-2ZM6 12h8v8H6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Zm0-2a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleSmall32);
