import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDroplet16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDroplet16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.75 10.154C11.75 12.297 10.052 14 8 14s-3.75-1.703-3.75-3.846c0-2.39 1.06-4.472 2.181-5.999A14.839 14.839 0 0 1 7.96 2.388l.04-.04.04.04c.417.41.973 1.01 1.529 1.767 1.12 1.527 2.181 3.61 2.181 5.999Zm1 0C12.75 12.83 10.623 15 8 15s-4.75-2.17-4.75-4.846C3.25 4.785 8 1 8 1s4.75 3.785 4.75 9.154ZM7 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDroplet16);
