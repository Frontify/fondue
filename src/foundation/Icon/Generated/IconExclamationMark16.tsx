import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMark16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconExclamationMark16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.5 2.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-1 0ZM8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconExclamationMark16);
