import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutLarge16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCardLayoutLarge16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 3H3a1 1 0 0 0-1 1v6h3V3Zm1 4v3h3.5V7H6Zm0-1h3.5V3H6v3Zm4.5 1v3H14V7h-3.5ZM14 6V4a1 1 0 0 0-1-1h-2.5v3H14ZM2 12v-1h12v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1ZM3 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutLarge16);
