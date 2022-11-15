import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowMinimize20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowMinimize20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.25 9a.75.75 0 0 0 0-1.5h-3.69l3.97-3.97a.75.75 0 0 0-1.06-1.06L12.5 6.44V2.75h-.75.75a.75.75 0 0 0-1.5 0h.75H11V9h6.25ZM2.47 17.48a.75.75 0 0 1 0-1.06l3.92-3.92H3.25a.75.75 0 0 1 0-1.5H9v5.75H7.5v-3.24l-3.97 3.97a.75.75 0 0 1-1.06 0Zm5.78-.73H9a.75.75 0 0 1-1.5 0h.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowMinimize20);
