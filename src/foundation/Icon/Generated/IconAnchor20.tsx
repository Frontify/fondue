import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconAnchor20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconAnchor20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm2.5-1a2.5 2.5 0 0 1-1.75 2.386V9.5h1.5a.75.75 0 0 1 0 1.5h-1.5v3.7c1.703-.233 3.039-1.241 3.558-2.488a.75.75 0 0 1 1.385.576c-.777 1.866-2.696 3.18-4.942 3.422v.29a.75.75 0 0 1-1.5 0v-.29c-2.247-.242-4.166-1.556-4.943-3.422a.75.75 0 0 1 1.385-.576c.519 1.247 1.855 2.255 3.557 2.488V11h-1.5a.75.75 0 0 1 0-1.5h1.5V6.886A2.501 2.501 0 1 1 12.5 4.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconAnchor20);
