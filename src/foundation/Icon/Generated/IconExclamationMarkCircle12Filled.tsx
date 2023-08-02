import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMarkCircle12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconExclamationMarkCircle12Filled"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#ExclamationMarkCircle12Filled)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12ZM6 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4A.5.5 0 0 1 6 2Zm1 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="ExclamationMarkCircle12Filled">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconExclamationMarkCircle12Filled);
