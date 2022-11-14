import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDividerBlank24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDividerBlank24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.5 5A1.5 1.5 0 0 1 7 3.5h10A1.5 1.5 0 0 1 18.5 5v3.25a.75.75 0 0 0 1.5 0V5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v3.25a.75.75 0 0 0 1.5 0V5Zm0 14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5v-3.25a.75.75 0 0 1 1.5 0V19a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-3.25a.75.75 0 0 1 1.5 0V19Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDividerBlank24);
