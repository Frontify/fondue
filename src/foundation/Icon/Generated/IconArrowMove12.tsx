import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowMove12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowMove12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#ArrowMove12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M3.879 2.854a.5.5 0 0 1 0-.707L5.647.379 6 .025l.354.354 1.768 1.768a.5.5 0 0 1-.708.707L6.5 1.939V5.5h3.56l-.914-.914a.5.5 0 0 1 .707-.707l1.768 1.768.354.353-.354.354-1.768 1.768a.5.5 0 0 1-.707-.708l.915-.914H6.5v3.561l.915-.914a.5.5 0 0 1 .707.707l-1.768 1.768-.354.353-.353-.353-1.768-1.768a.5.5 0 0 1 .707-.707l.914.914V6.5H1.939l.914.914a.5.5 0 0 1-.707.708L.378 6.354.025 6l.353-.353 1.768-1.768a.5.5 0 0 1 .707.707L1.94 5.5H5.5V1.94l-.914.914a.5.5 0 0 1-.707 0Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="ArrowMove12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconArrowMove12);
