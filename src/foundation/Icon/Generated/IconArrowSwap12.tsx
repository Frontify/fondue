import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowSwap12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowSwap12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.896 4.897a.5.5 0 0 0 .707.707l1.768-1.768.354-.353-.354-.354-1.768-1.768a.5.5 0 0 0-.707.707L9.828 3H1.121a.5.5 0 0 0 0 1h8.672l-.897.897ZM3.103 7.084 2.187 8H11a.5.5 0 0 1 0 1H2.19l.913.913a.5.5 0 1 1-.707.707L.628 8.852.275 8.5l.353-.354 1.768-1.768a.5.5 0 0 1 .707.707Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowSwap12);
