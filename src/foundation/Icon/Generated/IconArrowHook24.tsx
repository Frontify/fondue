import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowHook24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconArrowHook24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 4.5A.75.75 0 0 0 9 6v-.75V6h6.5c.966 0 1.75.783 1.75 1.75v6a1.75 1.75 0 0 1-1.75 1.75H9.68l1.85-1.85a.75.75 0 1 0-1.06-1.06l-3.182 3.182-.53.53.53.53 3.182 3.182a.75.75 0 0 0 1.06-1.06L9.577 17H15.5a3.25 3.25 0 0 0 3.25-3.25v-6A3.25 3.25 0 0 0 15.5 4.5H9v.75-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowHook24);
