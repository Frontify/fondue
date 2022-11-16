import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlayCircle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlayCircle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10Zm2 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Zm-12.935-4.846c-1.334-.787-3.017.174-3.017 1.722v6.288c0 1.53 1.649 2.493 2.982 1.742l5.45-3.07c1.342-.756 1.362-2.682.035-3.465l-5.45-3.217Zm-1.017 8.01v-6.288l5.45 3.217-5.45 3.07Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlayCircle32);
