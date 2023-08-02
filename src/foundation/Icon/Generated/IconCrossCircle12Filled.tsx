import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCrossCircle12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCrossCircle12Filled"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#CrossCircle12Filled)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12ZM3.525 3.525a.5.5 0 0 1 .707 0L6 5.293l1.768-1.768a.5.5 0 0 1 .707.707L6.707 6l1.768 1.768a.5.5 0 0 1-.707.707L6 6.707 4.232 8.475a.5.5 0 0 1-.707-.707L5.293 6 3.525 4.232a.5.5 0 0 1 0-.707Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="CrossCircle12Filled">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconCrossCircle12Filled);
