import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMarkCircle24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCheckMarkCircle24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm4.596-11.995a.75.75 0 1 0-1.06-1.06l-5.127 5.126-1.945-1.944a.75.75 0 1 0-1.06 1.06l2.475 2.475.53.53.53-.53 5.657-5.657Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMarkCircle24Filled);
