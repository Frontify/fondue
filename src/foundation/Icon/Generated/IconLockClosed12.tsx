import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLockClosed12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLockClosed12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M8 3v1H4V3a2 2 0 1 1 4 0ZM3 4V3a3 3 0 0 1 6 0v1h.5A1.5 1.5 0 0 1 11 5.5v5A1.5 1.5 0 0 1 9.5 12h-7A1.5 1.5 0 0 1 1 10.5v-5A1.5 1.5 0 0 1 2.5 4H3Zm6 1H2.5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5H9ZM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
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
export default memo(IconLockClosed12);
