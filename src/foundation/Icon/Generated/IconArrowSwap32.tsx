import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowSwap32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowSwap32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22.043 14.543a1 1 0 0 0 1.414 1.414l4.243-4.243.707-.707-.707-.707-4.243-4.242a1 1 0 1 0-1.414 1.414L24.571 10H5.001a1 1 0 1 0 0 2h19.585l-2.543 2.543ZM9.707 17.457 7.164 20H27a1 1 0 1 1 0 2H7.18l2.527 2.528a1 1 0 0 1-1.414 1.414L4.05 21.7l-.707-.707.707-.707 4.243-4.243a1 1 0 0 1 1.414 1.414Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowSwap32);
