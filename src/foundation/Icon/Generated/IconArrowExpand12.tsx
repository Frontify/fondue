import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowExpand12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowExpand12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.5 1a.5.5 0 0 0 0 1h1.804L6.646 4.657a.5.5 0 1 0 .708.707L10 2.718V4.5h.5-.5a.5.5 0 0 0 1 0h-.5.5V1H7.5ZM4.657 6.646a.5.5 0 1 1 .707.708L2.718 10H4.5a.5.5 0 0 1 0 1H1V7.5h1v1.805l2.657-2.658ZM1.5 7.5H1a.5.5 0 0 1 1 0h-.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowExpand12);
