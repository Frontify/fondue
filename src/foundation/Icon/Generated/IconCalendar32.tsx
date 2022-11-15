import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCalendar32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCalendar32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 3.5a1 1 0 0 1 1 1V5h6v-.5a1 1 0 1 1 2 0V5h2a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h2v-.5a1 1 0 0 1 1-1ZM19 7v.5a1 1 0 1 0 2 0V7h2a2 2 0 0 1 2 2v2H7V9a2 2 0 0 1 2-2h2v.5a1 1 0 1 0 2 0V7h6ZM7 13v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V13H7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCalendar32);
