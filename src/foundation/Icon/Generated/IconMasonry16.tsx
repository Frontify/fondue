import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMasonry16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMasonry16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 3h3.004v4.49H2V4a1 1 0 0 1 1-1Zm4.004 4.49V3H13a1 1 0 0 1 1 1v3.49H7.004ZM2 8.49V12a1 1 0 0 0 1 1h6.002V8.49H2Zm8.002 0V13H13a1 1 0 0 0 1-1V8.49h-3.998ZM1 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMasonry16);
