import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowCircleUp32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowCircleUp32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 26c5.523 0 10-4.477 10-10S21.523 6 16 6 6 10.477 6 16s4.477 10 10 10Zm0 2c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12Zm1-14.602 2.535 2.535a1 1 0 0 0 1.415-1.414l-4.243-4.243L16 9.57l-.707.707-2.606 2.606-1.155 1.156-.352.352-.096.095-.025.026-.007.006-.001.001.706.708-.707-.707a1 1 0 0 0 1.414 1.414l-.707-.707.707.707h.001l.002-.002.006-.006.025-.025.096-.096.352-.352 1.155-1.156.899-.898V21a1 1 0 1 0 2 0v-7.602Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowCircleUp32);
