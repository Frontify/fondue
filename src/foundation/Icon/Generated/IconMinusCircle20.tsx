import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMinusCircle20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMinusCircle20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm1.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.25 9.25a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMinusCircle20);
