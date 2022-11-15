import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLockClosed16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLockClosed16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 4.75v1H6v-1a2 2 0 1 1 4 0Zm-5 0a3 3 0 0 1 6 0V5.8h1a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7.8a2 2 0 0 1 2-2h1V4.75Zm8 3.05a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7.8Zm-4 2.7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLockClosed16);
