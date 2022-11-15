import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScissors32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconScissors32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.283 12.303a4 4 0 1 0-1.106 1.669L14.557 16l-3.38 2.028a4 4 0 1 0 1.106 1.669l4.217-2.53 1.947-1.165-.003-.002 8.57-5.143a1 1 0 1 0-1.029-1.715L16.5 14.834l-4.217-2.53Zm6.162 6.03 1.946-1.165 6.623 3.974a1 1 0 1 1-1.029 1.715l-7.54-4.524ZM8.5 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScissors32);
