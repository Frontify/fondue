import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMark20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconExclamationMark20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.75 3a.75.75 0 0 0-1.5 0v10.284a.75.75 0 0 0 1.5 0V3ZM10 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconExclamationMark20);
