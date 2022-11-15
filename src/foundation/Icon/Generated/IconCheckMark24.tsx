import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMark24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCheckMark24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.395 5.833a.75.75 0 0 1 0 1.061l-10.96 10.96-.531.53-.53-.53L4.01 13.49a.75.75 0 0 1 1.06-1.06l3.834 3.833 10.43-10.43a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMark24);
