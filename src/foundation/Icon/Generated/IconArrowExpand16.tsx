import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowExpand16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconArrowExpand16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.5 2a.5.5 0 0 0 0 1h2.803L8.646 6.657a.5.5 0 1 0 .707.707L13 3.717V6.5h.5-.5a.5.5 0 0 0 1 0h-.5.5V2H9.5ZM7.364 8.646a.5.5 0 0 1 0 .708L3.718 13H6.5a.5.5 0 0 1 0 1H2V9.5h1v2.804l3.657-3.657a.5.5 0 0 1 .707 0ZM3 9.5a.5.5 0 0 0-1 0h1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowExpand16);
