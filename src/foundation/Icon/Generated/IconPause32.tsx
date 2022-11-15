import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPause32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPause32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 7h5v18H8V7ZM6 7a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Zm13 0h5v18h-5V7Zm-2 0a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPause32);
