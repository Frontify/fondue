import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLockOpen12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLockOpen12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#LockOpen12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M5.405 1.065c-.317.067-.574.184-.712.346-.147.172-.212.26-.238.298l-.002.003a.5.5 0 0 1-.948-.283L4 1.5c-.495-.07-.495-.072-.495-.073v-.002l.001-.004.002-.008.003-.015a.503.503 0 0 1 .05-.139 1.04 1.04 0 0 1 .068-.113c.054-.08.145-.199.303-.384.353-.415.876-.593 1.266-.675A4.22 4.22 0 0 1 6.081 0h.02l.04.001A2.86 2.86 0 0 1 9 2.861V4h.5A1.5 1.5 0 0 1 11 5.5v5A1.5 1.5 0 0 1 9.5 12h-7A1.5 1.5 0 0 1 1 10.5v-5A1.5 1.5 0 0 1 2.5 4H8V2.86A1.86 1.86 0 0 0 6.079 1h-.013a3.188 3.188 0 0 0-.66.065ZM9.5 5h-7a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5ZM6 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="LockOpen12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconLockOpen12);
