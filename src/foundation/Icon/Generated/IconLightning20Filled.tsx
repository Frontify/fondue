import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLightning20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLightning20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="m11.332 2.053-8.286 8.284c-.629.629-.185 1.704.705 1.707l4.654.013-1.553 4.45c-.35 1.003.9 1.788 1.651 1.037l8.522-8.52c.63-.63.184-1.707-.707-1.707h-4.782l1.45-4.233c.343-1.002-.905-1.78-1.654-1.03Z"
            />
        </svg>
    );
}
export default memo(IconLightning20Filled);
