import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCode12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCode12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M3.707 8.997a.5.5 0 0 1-.708 0L.353 6.351l-.354-.354.354-.354 2.646-2.646a.5.5 0 0 1 .708.707L1.413 5.997 3.707 8.29a.5.5 0 0 1 0 .707Zm4.586-6a.5.5 0 0 1 .707 0l2.647 2.646.354.354-.354.354L9 8.997a.5.5 0 0 1-.707-.707l2.293-2.293-2.293-2.293a.5.5 0 0 1 0-.707Zm-.798.55a.5.5 0 0 0-.933-.359L4.572 8.37a.5.5 0 0 0 .934.359l1.99-5.182Z"
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
export default memo(IconCode12);
