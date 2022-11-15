import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMarkCircle24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCheckMarkCircle24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.5 12a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Zm1.5 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-5.404-2.453a.75.75 0 1 0-1.06-1.061l-5.127 5.126-1.945-1.944a.75.75 0 1 0-1.06 1.06l2.475 2.475.53.53.53-.53 5.657-5.656Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMarkCircle24);
