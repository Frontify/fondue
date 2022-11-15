import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowDown12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowDown12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.243 6.75a.5.5 0 1 0-.707-.708L6.5 9.078V1.507a.5.5 0 0 0-1 0v7.571L3.145 6.723l-.547-.547-.105-.105-.022-.022-.005-.005-.001-.001-.354.353.354-.354a.5.5 0 1 0-.708.708l.354-.354-.354.354.002.001.005.005.022.022.105.105.547.547 3.209 3.209.353.353.354-.353 3.889-3.89Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowDown12);
