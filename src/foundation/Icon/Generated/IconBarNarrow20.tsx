import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBarNarrow20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconBarNarrow20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17 9.5H3a.5.5 0 0 0 0 1h14a.5.5 0 0 0 0-1ZM3 8a2 2 0 1 0 0 4h14a2 2 0 1 0 0-4H3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBarNarrow20);
