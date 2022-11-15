import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLightning32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLightning32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M18.773 4.575 6.056 17.293c-.629.629-.185 1.704.704 1.707l7.054.02-2.57 7.368c-.35 1.004.9 1.788 1.65 1.037l13.05-13.05c.63-.63.184-1.707-.707-1.707h-7.228l2.418-7.062c.343-1.002-.904-1.78-1.654-1.03Z"
            />
        </svg>
    );
}
export default memo(IconLightning32Filled);
