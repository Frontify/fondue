import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowHook32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowHook32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11 7a1 1 0 1 0 0 2V8v1h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8.486l2.193-2.193a1 1 0 0 0-1.414-1.414l-3.89 3.889-.706.707.707.707 3.889 3.89a1 1 0 0 0 1.414-1.415L11.537 23H20a4 4 0 0 0 4-4v-8a4 4 0 0 0-4-4h-8.999v1-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowHook32);
