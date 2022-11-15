import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutMedium32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCardLayoutMedium32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 10h4v5H5v-3a2 2 0 0 1 2-2Zm6-2H7a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4v-8a4 4 0 0 0-4-4H13Zm6 2h-6v5h6v-5Zm2 5h6v-3a2 2 0 0 0-2-2h-4v5ZM5 17v3a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-3H5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutMedium32);
