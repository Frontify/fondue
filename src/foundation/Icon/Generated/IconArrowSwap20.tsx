import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowSwap20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowSwap20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.47 8.56a.75.75 0 1 0 1.06 1.06l2.829-2.828.53-.53-.53-.53-2.829-2.829a.75.75 0 0 0-1.06 1.06L16.006 5.5H2A.75.75 0 1 0 2 7h14.03l-1.56 1.56ZM4 13h-.02l1.55-1.55a.75.75 0 0 0-1.06-1.06l-2.83 2.83-.53.53.53.53 2.829 2.829a.75.75 0 0 0 1.06-1.061L3.984 14.5H18a.75.75 0 0 0 0-1.5H4Zm-.768.749.018-.018v.036l-.018-.018Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowSwap20);
