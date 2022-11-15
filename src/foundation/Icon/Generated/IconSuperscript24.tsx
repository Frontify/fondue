import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSuperscript24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconSuperscript24"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}>
                <path strokeLinejoin="round" d="M3.817 17.126 14.069 6.874m-10.252 0 10.252 10.252" />
                <path d="m18.68 4.297 1.576-.358V8.34" />
            </g>
        </svg>
    );
}
export default memo(IconSuperscript24);
