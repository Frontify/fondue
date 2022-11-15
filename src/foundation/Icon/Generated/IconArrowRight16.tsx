import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowRight16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconArrowRight16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.25 2.99a.5.5 0 0 0-.707.707l3.803 3.804H2.239a.5.5 0 0 0 0 1h10.107l-2.663 2.663-.858.858-.212.212-.053.052-.013.014-.003.003h-.001l.353.354-.353-.353a.5.5 0 1 0 .707.707l-.354-.354.354.354v-.001l.004-.003.013-.014.053-.052.212-.212.858-.858 3.517-3.517.353-.353-.353-.354L9.25 2.99Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowRight16);
