import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMark16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCheckMark16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.17 3.896a.5.5 0 0 1 0 .708l-7.253 7.253-.353.353-.354-.353-2.564-2.565a.5.5 0 1 1 .707-.707l2.21 2.21 6.9-6.899a.5.5 0 0 1 .708 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMark16);
