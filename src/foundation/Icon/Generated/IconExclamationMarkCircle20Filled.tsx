import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMarkCircle20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconExclamationMarkCircle20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-.75-8V5.5a.75.75 0 0 1 1.5 0V11a.75.75 0 0 1-1.5 0ZM11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconExclamationMarkCircle20Filled);
