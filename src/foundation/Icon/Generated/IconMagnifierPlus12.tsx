import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifierPlus12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMagnifierPlus12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#MagnifierPlus12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M5.5 10a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm4.203-.952a5.5 5.5 0 1 0-.655.655c.024.058.06.112.108.16l1.77 1.77a.5.5 0 1 0 .706-.708l-1.77-1.77a.498.498 0 0 0-.16-.107ZM6 3.5a.5.5 0 0 0-1 0V5H3.5a.5.5 0 0 0 0 1H5v1.5a.5.5 0 0 0 1 0V6h1.5a.5.5 0 0 0 0-1H6V3.5Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="MagnifierPlus12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconMagnifierPlus12);
