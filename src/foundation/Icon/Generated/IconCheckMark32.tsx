import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMark32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCheckMark32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M25.43 9.391a1 1 0 0 1 0 1.414L13.056 23.18l-.708.707-.707-.707-5.07-5.071a1 1 0 0 1 1.413-1.415l4.364 4.364L24.016 9.391a1 1 0 0 1 1.414 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMark32);
