import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTextIndent12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextIndent12"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                d="M10.5 3.5h-9m9 2h-5m5 4h-9m9-2h-5M1.594 5.44l1.06 1.06-1.06 1.06"
            />
        </svg>
    );
}
export default memo(IconTextIndent12);
