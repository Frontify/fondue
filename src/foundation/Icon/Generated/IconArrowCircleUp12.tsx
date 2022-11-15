import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowCircleUp12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowCircleUp12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10Zm0 1A6 6 0 1 0 6 0a6 6 0 0 0 0 12Zm.5-7.268 1.621 1.622a.5.5 0 1 0 .707-.708L6.354 3.172 6 2.818l-.354.354-1.52 1.52-.674.674-.205.205-.056.056-.014.014-.004.004-.001.001.353.354-.353-.354a.5.5 0 1 0 .707.708L3.525 6l.354.354v-.002l.005-.003.014-.015.056-.056.205-.205.675-.674.666-.667v3.84a.5.5 0 0 0 1 0v-3.84Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconArrowCircleUp12);
