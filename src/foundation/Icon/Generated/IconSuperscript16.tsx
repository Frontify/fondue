import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSuperscript16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconSuperscript16"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeLinecap="round">
                <path strokeLinejoin="round" d="M9.97 11.711 2.546 4.29m.001 7.421L9.97 4.29" />
                <path d="m12.17 2.944 1.336-.318v3.908" />
            </g>
        </svg>
    );
}
export default memo(IconSuperscript16);
