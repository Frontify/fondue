import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconListIndented32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconListIndented32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 24V7a1 1 0 0 1 2 0v17a1 1 0 1 1-2 0ZM28 8a1 1 0 0 1-1 1H10a1 1 0 0 1 0-2h17a1 1 0 0 1 1 1Zm-1 11a1 1 0 1 0 0-2H10a1 1 0 1 0 0 2h17Zm-2-6a1 1 0 0 1-1 1H10a1 1 0 1 1 0-2h14a1 1 0 0 1 1 1Zm-1 11a1 1 0 1 0 0-2H10a1 1 0 1 0 0 2h14Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconListIndented32);
