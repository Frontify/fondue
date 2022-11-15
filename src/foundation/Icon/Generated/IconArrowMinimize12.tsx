import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowMinimize12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowMinimize12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11.354 1.354a.5.5 0 0 0-.707-.708L8 3.293V1.5h-.5.5a.5.5 0 0 0-1 0h.5H7V5h3.5a.5.5 0 0 0 0-1H8.707l2.647-2.646Zm-10.708 10a.5.5 0 0 1 0-.707L3.293 8H1.5a.5.5 0 0 1 0-1H5v3.5H4V8.706l-2.646 2.647a.5.5 0 0 1-.708 0ZM4.5 10.5H5a.5.5 0 0 1-1 0h.5Z"
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
export default memo(IconArrowMinimize12);
