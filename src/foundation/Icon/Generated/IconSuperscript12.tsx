import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSuperscript12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSuperscript12"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeLinecap="round">
                <path strokeLinejoin="round" d="M7.184 8.828 1.527 3.172m.001 5.656 5.657-5.656" />
                <path d="m9.17 1.944 1.336-.318v3.908" />
            </g>
        </svg>
    );
}
export default memo(IconSuperscript12);
