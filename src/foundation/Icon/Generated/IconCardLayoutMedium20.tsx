import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutMedium20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCardLayoutMedium20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 5.5H6v4H2.5v-3a1 1 0 0 1 1-1Zm4 4v-4H12v4H7.5Zm6 0h4v-3a1 1 0 0 0-1-1h-3v4ZM2.5 11v2.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V11h-15ZM19 11v2.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 13.5v-7A2.5 2.5 0 0 1 3.5 4h13A2.5 2.5 0 0 1 19 6.5V11Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutMedium20);
