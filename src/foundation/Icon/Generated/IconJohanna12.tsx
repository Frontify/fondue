import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconJohanna12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconJohanna12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#Johanna12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0Zm1 0A6 6 0 1 1 0 6a6 6 0 0 1 12 0ZM8.429 6A2.429 2.429 0 1 1 3.57 6a2.429 2.429 0 0 1 4.86 0Zm1 0A3.429 3.429 0 1 1 2.57 6a3.429 3.429 0 0 1 6.86 0Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="Johanna12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconJohanna12);
