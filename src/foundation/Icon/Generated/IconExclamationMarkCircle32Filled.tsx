import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMarkCircle32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconExclamationMarkCircle32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12Zm-1-10.5V10a1 1 0 1 1 2 0v7.5a1 1 0 1 1-2 0Zm2.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconExclamationMarkCircle32Filled);
