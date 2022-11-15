import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSuperscript32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconSuperscript32"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}>
                <path strokeLinejoin="round" d="m7.344 21.657 11.313-11.314m-11.313 0 11.313 11.314" />
                <path d="m22.83 6.739 2.156-.489v6.007" />
            </g>
        </svg>
    );
}
export default memo(IconSuperscript32);
