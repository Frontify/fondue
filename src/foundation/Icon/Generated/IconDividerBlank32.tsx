import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDividerBlank32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDividerBlank32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a1 1 0 1 0 2 0V7a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v4a1 1 0 1 0 2 0V7Zm16 18a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4a1 1 0 1 0-2 0v4a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-4a1 1 0 1 0-2 0v4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDividerBlank32);
