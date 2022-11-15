import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconClock24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconClock24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.5 12a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Zm1.5 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-5.779.75a.75.75 0 1 0 0-1.5H12.75V6.796a.75.75 0 0 0-1.5 0v5.954h4.971Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconClock24);
