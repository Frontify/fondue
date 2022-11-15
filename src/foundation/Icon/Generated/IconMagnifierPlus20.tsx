import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifierPlus20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMagnifierPlus20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.5 16.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm6.517-1.543a8.5 8.5 0 1 0-1.06 1.06l2.676 2.677a.75.75 0 0 0 1.06-1.06l-2.676-2.677ZM8.75 10.25v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMagnifierPlus20);
