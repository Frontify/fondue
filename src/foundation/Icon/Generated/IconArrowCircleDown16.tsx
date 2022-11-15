import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowCircleDown16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconArrowCircleDown16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm0-1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.509 8.845L5.517 7.87a.5.5 0 0 0-.708.707l2.829 2.829.353.353.354-.354 1.737-1.737.77-.77.235-.235.064-.064.017-.016.004-.005h.001l-.353-.354.353.353a.5.5 0 1 0-.707-.707l.354.354-.354-.354-.001.001-.004.005-.017.016-.064.064-.235.235-.77.77-.884.884V4.898a.5.5 0 0 0-1 0v4.947Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowCircleDown16);
