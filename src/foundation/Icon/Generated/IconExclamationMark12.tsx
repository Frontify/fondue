import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMark12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconExclamationMark12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M5.5 1v7a.5.5 0 0 0 1 0V1a.5.5 0 0 0-1 0ZM6 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
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
export default memo(IconExclamationMark12);
