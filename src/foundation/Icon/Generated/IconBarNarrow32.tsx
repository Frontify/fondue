import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBarNarrow32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconBarNarrow32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M26 15H6a1 1 0 1 0 0 2h20a1 1 0 1 0 0-2ZM6 13a3 3 0 1 0 0 6h20a3 3 0 1 0 0-6H6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBarNarrow32);
