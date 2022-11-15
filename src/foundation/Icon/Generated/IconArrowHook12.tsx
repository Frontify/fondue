import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowHook12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowHook12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 2a.5.5 0 0 0 0 1v-.5.5h4.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4.225l.896-.896a.5.5 0 1 0-.707-.708L2.647 8.164l-.354.354.354.353 1.767 1.768a.5.5 0 0 0 .707-.707L4.19 9H8.5A1.5 1.5 0 0 0 10 7.5v-4A1.5 1.5 0 0 0 8.5 2H4.001v.5V2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowHook12);
