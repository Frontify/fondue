import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCalendar20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCalendar20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.75 1a.75.75 0 0 1 .75.75V2h5v-.25a.75.75 0 0 1 1.5 0V2h1.5A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5v-11A2.5 2.5 0 0 1 4.5 2H6v-.25A.75.75 0 0 1 6.75 1Zm5.75 2.5v.75a.75.75 0 0 0 1.5 0V3.5h1.5a1 1 0 0 1 1 1v2h-13v-2a1 1 0 0 1 1-1H6v.75a.75.75 0 0 0 1.5 0V3.5h5ZM3.5 8v7.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V8h-13Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCalendar20);
