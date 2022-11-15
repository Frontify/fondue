import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckbox32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCheckbox32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 7h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2ZM5 9a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Zm7.404 7.56a1 1 0 1 0-1.414 1.415l2.535 2.535.707.707.707-.707 7.072-7.07a1 1 0 0 0-1.415-1.415l-6.364 6.364-1.828-1.828Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckbox32);
