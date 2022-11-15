import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPerson24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPerson24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm.132 3.012a4 4 0 1 0-5.265 0A7.002 7.002 0 0 0 5 17.5v3h14v-3a7.002 7.002 0 0 0-4.368-6.488ZM12 12a5.5 5.5 0 0 0-5.5 5.5V19h11v-1.5A5.5 5.5 0 0 0 12 12Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPerson24);
