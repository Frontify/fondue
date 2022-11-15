import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowHook16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconArrowHook16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.5 3a.5.5 0 0 0 0 1v-.5.5h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5.906l1.276-1.276a.5.5 0 0 0-.707-.708l-2.121 2.122L4 11.49l.354.354 2.12 2.121a.5.5 0 1 0 .708-.707L5.922 12H10.5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-5v.5V3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowHook16);
