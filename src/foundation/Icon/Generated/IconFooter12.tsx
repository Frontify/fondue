import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFooter12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFooter12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.5 2h7a.5.5 0 0 1 .5.5V7H2V2.5a.5.5 0 0 1 .5-.5ZM2 8v1.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V8H2ZM1 2.5A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5v7A1.5 1.5 0 0 1 9.5 11h-7A1.5 1.5 0 0 1 1 9.5v-7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFooter12);
