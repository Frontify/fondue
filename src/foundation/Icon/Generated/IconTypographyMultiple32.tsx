import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTypographyMultiple32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTypographyMultiple32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 7h16v3a1 1 0 1 1-2 0V9h-5v14h2a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h2V9H5v1a1 1 0 1 1-2 0V7Zm19 8h-5v-2h12v2h-5v10h-2V15Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTypographyMultiple32);
