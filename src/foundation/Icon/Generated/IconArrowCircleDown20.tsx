import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowCircleDown20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowCircleDown20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm.742 10.972V6.177a.75.75 0 0 0-1.5 0v5.777L6.994 9.708a.75.75 0 1 0-1.06 1.06l3.463 3.464a.75.75 0 0 0 .135.135l.467.467.53-.53 2.172-2.171.963-.963.293-.294.08-.08.02-.02.006-.006.001-.001-.53-.53.53.53a.75.75 0 0 0-1.06-1.061l.53.53-.53-.53-.002.002-.005.005-.02.02-.08.08-.294.294-.963.963-.9.9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowCircleDown20);
