import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMark20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCheckMark20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.845 5.034a.75.75 0 0 1 0 1.06l-8.96 8.96-.53.531-.53-.53L3.26 11.49a.75.75 0 1 1 1.06-1.061l3.034 3.034 8.43-8.43a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMark20);
