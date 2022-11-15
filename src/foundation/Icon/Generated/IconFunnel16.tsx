import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFunnel16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFunnel16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m9 10.007.155-.246L12.804 4H3.148l3.694 5.757.158.246v3.253l2-.731v-2.519Zm1 .29 3.649-5.762A1 1 0 0 0 12.804 3H3.148a1 1 0 0 0-.842 1.54L6 10.296v2.96a1 1 0 0 0 1.344.94l2-.732a1 1 0 0 0 .656-.94v-2.227Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFunnel16);
