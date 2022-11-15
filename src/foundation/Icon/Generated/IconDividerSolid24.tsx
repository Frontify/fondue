import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDividerSolid24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDividerSolid24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 3.5A1.5 1.5 0 0 0 5.5 5v2.5a.75.75 0 0 1-1.5 0V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v2.5a.75.75 0 0 1-1.5 0V5A1.5 1.5 0 0 0 17 3.5H7Zm0 17A1.5 1.5 0 0 1 5.5 19v-2.5a.75.75 0 0 0-1.5 0V19a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2.5a.75.75 0 0 0-1.5 0V19a1.5 1.5 0 0 1-1.5 1.5H7Zm-2.25-9.25a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H4.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDividerSolid24);
