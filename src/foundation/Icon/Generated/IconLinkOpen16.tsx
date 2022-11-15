import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLinkOpen16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLinkOpen16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 5a3 3 0 0 0 0 6h2a.5.5 0 0 0 0-1H4a2 2 0 1 1 0-4h2a.5.5 0 0 0 0-1H4Zm8 6a3 3 0 1 0 0-6h-2a.5.5 0 0 0 0 1h2a2 2 0 1 1 0 4h-2a.5.5 0 0 0 0 1h2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLinkOpen16);
