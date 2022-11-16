import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSuperscript20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconSuperscript20"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}>
                <path strokeLinejoin="round" d="m2.727 14.772 9.546-9.545m-9.545 0 9.545 9.546" />
                <path d="m15.68 3.297 1.576-.358V7.34" />
            </g>
        </svg>
    );
}
export default memo(IconSuperscript20);
