import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlus20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlus20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 10.5v6.25a.75.75 0 0 0 1.5 0V10.5h6.25a.75.75 0 0 0 0-1.5H10.5V2.75a.75.75 0 0 0-1.5 0V9H2.75a.75.75 0 0 0 0 1.5H9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlus20);
