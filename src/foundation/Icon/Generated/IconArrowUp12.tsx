import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowUp12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowUp12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.757 5.257a.5.5 0 0 0 .707.707L5.5 2.93v7.57a.5.5 0 1 0 1 0V2.93l2.355 2.355.547.547.105.105.022.022.005.005.001.001.354-.353-.354.353a.5.5 0 1 0 .707-.707l-.353.354.354-.354-.002-.001-.005-.005-.022-.023-.105-.104-.547-.547-3.209-3.209L6 1.015l-.354.353-3.889 3.89Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowUp12);
