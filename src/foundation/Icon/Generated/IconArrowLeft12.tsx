import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowLeft12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowLeft12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.25 10.242a.5.5 0 1 0 .707-.707L2.922 6.5h7.57a.5.5 0 1 0 0-1h-7.57l2.355-2.355.546-.547.105-.105.022-.022.005-.005.002-.002-.353-.353.353.353a.5.5 0 1 0-.707-.707l.354.354-.354-.354-.002.002-.005.005-.022.022-.105.105-.546.546-3.21 3.21L1.008 6l.354.353 3.889 3.89Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowLeft12);
