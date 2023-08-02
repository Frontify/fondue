import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifier12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMagnifier12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#Magnifier12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M10.354 5.677a4.677 4.677 0 1 1-9.354 0 4.677 4.677 0 0 1 9.354 0ZM9.322 10.03a5.677 5.677 0 1 1 .707-.707l1.603 1.602a.5.5 0 1 1-.707.707L9.322 10.03Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="Magnifier12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconMagnifier12);
