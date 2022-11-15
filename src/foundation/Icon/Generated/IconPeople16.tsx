import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPeople16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPeople16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 7a1.75 1.75 0 1 0 0-3.5A1.75 1.75 0 0 0 6 7Zm2.75-1.75c0 .832-.37 1.578-.954 2.082A5.002 5.002 0 0 1 11 12v1h2.696v-.74A3.349 3.349 0 0 0 11 8.978V7.62a1.391 1.391 0 0 0-1-2.577V4.025a2.391 2.391 0 0 1 1.91 4.177 4.35 4.35 0 0 1 2.786 4.059V14H1v-2a5.002 5.002 0 0 1 3.204-4.668A2.75 2.75 0 1 1 8.75 5.25ZM6 13h4v-1a4 4 0 1 0-8 0v1h4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPeople16);
