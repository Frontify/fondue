import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleSmall16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconScaleSmall16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11 6H8v4h3V6Zm1 0v4h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm0 5h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h9Zm-9-1h4V6H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleSmall16);
