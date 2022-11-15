import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowUp16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconArrowUp16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.99 6.49a.5.5 0 1 0 .707.707L7.5 3.394V13.5a.5.5 0 1 0 1 0V3.394l2.664 2.663.857.858.212.212.053.053.013.013.003.003h.001v.001l.354-.354-.354.354a.5.5 0 1 0 .707-.707l-.353.353.354-.353-.002-.001-.003-.003-.013-.014-.053-.052-.211-.212-.858-.858-3.517-3.517L8 1.479l-.353.354L2.99 6.49Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowUp16);
