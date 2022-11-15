import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowHook20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowHook20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 3.5A.75.75 0 1 0 7 5v-.75V5h6c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25H7.79l1.569-1.57a.75.75 0 1 0-1.06-1.06l-2.83 2.828-.53.53.53.53 2.83 2.83a.75.75 0 1 0 1.06-1.062L7.832 15H13a2.75 2.75 0 0 0 2.75-2.75v-6A2.75 2.75 0 0 0 13 3.5H7.001v.75-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowHook20);
