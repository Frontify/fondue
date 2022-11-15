import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutSmall32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCardLayoutSmall32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13 13h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H13v-6Zm-2 0H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6Zm0 8H7a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H11Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutSmall32);
