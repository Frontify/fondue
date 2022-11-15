import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCalendar16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCalendar16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.5 1a.5.5 0 0 1 .5.5V2h4v-.5a.5.5 0 0 1 1 0V2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1v-.5a.5.5 0 0 1 .5-.5ZM10 3v.5a.5.5 0 0 0 1 0V3h1a1 1 0 0 1 1 1v2H3V4a1 1 0 0 1 1-1h1v.5a.5.5 0 0 0 1 0V3h4ZM3 7v5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7H3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCalendar16);
