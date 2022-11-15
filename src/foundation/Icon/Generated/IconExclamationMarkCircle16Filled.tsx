import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMarkCircle16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconExclamationMarkCircle16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 14.977a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM7.5 8.5v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconExclamationMarkCircle16Filled);
