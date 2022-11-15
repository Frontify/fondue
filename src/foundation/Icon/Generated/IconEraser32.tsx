import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconEraser32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconEraser32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m18.263 5.828 2.829 2.829-8.485 8.485-2.829-2.828 8.485-8.486ZM16.85 21.385l-2.828-2.829 8.485-8.485 2.828 2.829-8.485 8.485Zm-8.485-5.657-2.121 2.121a2 2 0 0 0 0 2.829l4.242 4.242a2 2 0 0 0 2.829 0l2.12-2.121-7.07-7.071ZM18.264 3l1.414 1.414 7.07 7.071 1.415 1.415-1.414 1.414-12.021 12.02a4 4 0 0 1-5.657 0l-4.243-4.242a4 4 0 0 1 0-5.657L16.85 4.415 18.263 3ZM19 26a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconEraser32);
