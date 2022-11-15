import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCalendarChecked12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCalendarChecked12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M4 .5a.5.5 0 0 0-1 0V1h-.5A1.5 1.5 0 0 0 1 2.5v7A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5v-7A1.5 1.5 0 0 0 9.5 1H9V.5a.5.5 0 0 0-1 0V1H4V.5Zm4 2V2H4v.5a.5.5 0 0 1-1 0V2h-.5a.5.5 0 0 0-.5.5V4h8V2.5a.5.5 0 0 0-.5-.5H9v.5a.5.5 0 0 1-1 0Zm-6 7V5h8v4.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5Zm2.854-2.354a.5.5 0 1 0-.708.708l.98.979.353.353.354-.353 2.12-2.122a.5.5 0 1 0-.706-.707L5.479 7.772l-.625-.626Z"
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
export default memo(IconCalendarChecked12);
