import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCalendar24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCalendar24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.75 2a.75.75 0 0 1 .75.75V3h7v-.25a.75.75 0 0 1 1.5 0V3h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h1v-.25A.75.75 0 0 1 7.75 2Zm7.75 2.5v.75a.75.75 0 0 0 1.5 0V4.5h1A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5h1v.75a.75.75 0 0 0 1.5 0V4.5h7ZM4.5 10v8A1.5 1.5 0 0 0 6 19.5h12a1.5 1.5 0 0 0 1.5-1.5v-8h-15Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCalendar24);
