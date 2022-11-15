import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowMove32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowMove32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.757 9.743a1 1 0 0 1 0-1.414l3.536-3.536.707-.707.699.699.016.017 3.528 3.527a1 1 0 0 1-1.415 1.414L17 7.914V15h7.192l-1.828-1.828a1 1 0 0 1 1.414-1.415l3.536 3.536.707.707-.707.707-3.536 3.536a1 1 0 0 1-1.414-1.414L24.192 17H17v7.086l1.828-1.828a1 1 0 0 1 1.415 1.414l-3.536 3.535-.707.707-.707-.707-3.536-3.535a1 1 0 1 1 1.415-1.414L15 24.086V17H7.807l1.829 1.829a1 1 0 1 1-1.414 1.414l-3.536-3.536L3.98 16l.707-.707 3.536-3.535a1 1 0 0 1 1.414 1.414L7.807 15H15V7.914l-1.829 1.829a1 1 0 0 1-1.414 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowMove32);
