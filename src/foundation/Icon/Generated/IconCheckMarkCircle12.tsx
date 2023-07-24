import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMarkCircle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCheckMarkCircle12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#CheckMarkCircle12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0Zm1 0A6 6 0 1 1 0 6a6 6 0 0 1 12 0Zm-3.066-.967a.5.5 0 1 0-.707-.707L5.1 7.454 3.773 6.128a.5.5 0 0 0-.707.707l1.68 1.68.353.353.353-.353 3.482-3.482Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="CheckMarkCircle12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconCheckMarkCircle12);
