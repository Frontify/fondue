import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBarNarrow16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconBarNarrow16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.5 7.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1Zm-11-1a1.5 1.5 0 1 0 0 3h11a1.5 1.5 0 0 0 0-3h-11Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBarNarrow16);
