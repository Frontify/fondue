import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowCircleDown12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowCircleDown12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#ArrowCircleDown12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1Zm0-1a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm-.5 7.268L3.879 5.646a.5.5 0 1 0-.707.708l2.474 2.474.354.354.354-.354 1.52-1.52.674-.674.205-.205.056-.056.014-.014.004-.004.001-.001L8.475 6l.353.354a.5.5 0 1 0-.707-.708L8.475 6l-.354-.354v.002l-.005.003-.014.015-.056.056-.205.205-.675.674-.666.667v-3.84a.5.5 0 0 0-1 0v3.84Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="ArrowCircleDown12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconArrowCircleDown12);
