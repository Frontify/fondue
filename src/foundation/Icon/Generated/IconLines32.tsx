import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLines32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLines32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 10a1 1 0 0 1 1-1h20a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h20a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm1 5a1 1 0 1 0 0 2h20a1 1 0 1 0 0-2H6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLines32);
