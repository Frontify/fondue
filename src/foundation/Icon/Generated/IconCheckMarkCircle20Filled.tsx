import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMarkCircle20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCheckMarkCircle20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm4.28-10.672a.75.75 0 1 0-1.061-1.06l-4.42 4.42-1.768-1.769a.75.75 0 1 0-1.06 1.061l2.298 2.298.53.53.53-.53 4.95-4.95Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMarkCircle20Filled);
