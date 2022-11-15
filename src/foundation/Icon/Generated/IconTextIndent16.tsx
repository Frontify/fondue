import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTextIndent16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextIndent16"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                d="M13.5 3.5h-11m11 3h-7m7 6h-11m11-3h-7M2.54 6.406l1.768 1.768L2.54 9.942"
            />
        </svg>
    );
}
export default memo(IconTextIndent16);
