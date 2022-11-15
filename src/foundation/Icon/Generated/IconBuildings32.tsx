import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBuildings32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconBuildings32"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 10h2M4 27h2m4-13h2m-2 8h2m4 5V11l10-3v14m-10 5H6m10 0h12M6 27V7l10-3v3m4 7h2m-2 8h2m-12-4h2m8 0h2"
            />
        </svg>
    );
}
export default memo(IconBuildings32);
