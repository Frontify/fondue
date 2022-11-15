import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretDown20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCaretDown20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.804 6.192a.75.75 0 0 1 0 1.06l-6.245 6.246-.53.53-.531-.53-6.246-6.245a.75.75 0 0 1 1.06-1.061l5.716 5.715 5.716-5.715a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretDown20);
