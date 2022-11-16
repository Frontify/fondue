import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckbox12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCheckbox12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.5 2h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM1 2.5A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5v7A1.5 1.5 0 0 1 9.5 11h-7A1.5 1.5 0 0 1 1 9.5v-7Zm3.104 3.646a.5.5 0 1 0-.708.708l1.445 1.444.354.354.353-.354 3.304-3.303a.5.5 0 0 0-.707-.707l-2.95 2.95-1.091-1.092Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckbox12);
