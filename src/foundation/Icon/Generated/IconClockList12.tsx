import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconClockList12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconClockList12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#ClockList12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M1 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-5a5 5 0 1 0 0 10A5 5 0 0 0 5 1Zm.5 2.5a.5.5 0 1 0-1 0v3H7a.5.5 0 1 0 0-1H5.5v-2Zm6-1.5H9.472a6.032 6.032 0 0 0-1.154-1H11.5a.5.5 0 1 1 0 1Zm0 3h-.583a5.962 5.962 0 0 0-.258-1h.841a.5.5 0 1 1 0 1Zm-.841 3c.113-.322.2-.656.258-1h.583a.5.5 0 1 1 0 1h-.841Zm-1.187 2a6.02 6.02 0 0 1-1.154 1H11.5a.5.5 0 1 0 0-1H9.472Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="ClockList12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconClockList12);
