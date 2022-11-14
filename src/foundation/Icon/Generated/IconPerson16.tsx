import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPerson16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPerson16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.75 5.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm.046 2.082a2.75 2.75 0 1 0-3.593 0A5.002 5.002 0 0 0 3 12v2h10v-2a5.002 5.002 0 0 0-3.204-4.668ZM8 8a4 4 0 0 0-4 4v1h8v-1a4 4 0 0 0-4-4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPerson16);
