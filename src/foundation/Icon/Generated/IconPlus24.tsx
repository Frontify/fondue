import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlus24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPlus24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11 12.5v7.25a.75.75 0 0 0 1.5 0V12.5h7.25a.75.75 0 0 0 0-1.5H12.5V3.75a.75.75 0 0 0-1.5 0V11H3.75a.75.75 0 1 0 0 1.5H11Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlus24);
