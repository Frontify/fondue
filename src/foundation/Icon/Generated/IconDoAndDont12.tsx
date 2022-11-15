import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDoAndDont12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDoAndDont12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.844 5.866a.5.5 0 0 1-.707 0L3.722 4.452 2.308 5.866a.5.5 0 1 1-.707-.707l1.414-1.414L1.601 2.33a.5.5 0 1 1 .707-.708l1.414 1.415 1.415-1.414a.5.5 0 0 1 .707.707L4.43 3.745l1.414 1.414a.5.5 0 0 1 0 .707Zm4.918 1.558a.5.5 0 1 0-.707-.707L7.302 9.471l-1.19-1.19a.5.5 0 1 0-.707.707l1.543 1.543.354.354.353-.354 3.107-3.107Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDoAndDont12);
