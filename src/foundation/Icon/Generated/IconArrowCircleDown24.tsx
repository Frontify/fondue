import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowCircleDown24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconArrowCircleDown24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 12a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm14.42.13a.75.75 0 0 1 0 1.06l-.53-.53-.531-.53a.75.75 0 0 1 1.06 0Zm-.53.53.53.53h-.001l-.002.002-.005.006-.023.023-.088.088-.323.323-1.06 1.059-2.388 2.388-.53.53-.53-.53-3.89-3.889a.75.75 0 0 1 1.061-1.06l2.6 2.6V7.525a.75.75 0 1 1 1.5 0v7.222l1.117-1.117 1.06-1.06.322-.322.088-.088.023-.023.006-.005.001-.002.531.53Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowCircleDown24);
