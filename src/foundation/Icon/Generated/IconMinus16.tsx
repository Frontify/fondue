import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMinus16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMinus16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 8H4a.5.5 0 1 1 0-1h8a.5.5 0 0 1 0 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMinus16);
