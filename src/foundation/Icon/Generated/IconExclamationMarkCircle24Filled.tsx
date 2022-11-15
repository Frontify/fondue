import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMarkCircle24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconExclamationMarkCircle24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-.75-8.748v-6.5a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-1.5 0Zm2 3.498a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconExclamationMarkCircle24Filled);
