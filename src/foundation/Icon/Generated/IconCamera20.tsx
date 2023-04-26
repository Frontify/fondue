import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCamera20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCamera20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.5 6.5h7a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1ZM2 7.5A2.5 2.5 0 0 1 4.5 5h7A2.5 2.5 0 0 1 14 7.5v1.158l3.362-2.218a.75.75 0 0 1 1.163.631l-.04 5.99a.75.75 0 0 1-1.17.617L14 11.442V12.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-5Zm12.616 2.548 2.378 1.604.022-3.187-2.4 1.583Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCamera20);
