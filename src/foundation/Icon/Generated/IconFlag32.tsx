import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFlag32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFlag32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 19v9a1 1 0 1 0 2 0v-9h16.76c.865 0 1.322-1.024.744-1.668L21.722 12l4.782-5.332c.578-.644.12-1.668-.744-1.668H9V4a1 1 0 1 0-2 0v15ZM9 7v10h14.52l-3.287-3.665L19.036 12l1.197-1.335L23.52 7H9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFlag32);
