import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutSmall16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCardLayoutSmall16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 6h7a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6V6ZM5 5h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2Zm0 1v4H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutSmall16);
