import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCalendar12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCalendar12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M3.5 0a.5.5 0 0 1 .5.5V1h4V.5a.5.5 0 0 1 1 0V1h.5A1.5 1.5 0 0 1 11 2.5v7A1.5 1.5 0 0 1 9.5 11h-7A1.5 1.5 0 0 1 1 9.5v-7A1.5 1.5 0 0 1 2.5 1H3V.5a.5.5 0 0 1 .5-.5ZM8 2v.5a.5.5 0 0 0 1 0V2h.5a.5.5 0 0 1 .5.5V4H2V2.5a.5.5 0 0 1 .5-.5H3v.5a.5.5 0 0 0 1 0V2h4ZM2 5v4.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V5H2Z"
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
export default memo(IconCalendar12);
