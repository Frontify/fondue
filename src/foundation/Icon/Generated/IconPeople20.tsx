import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPeople20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPeople20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.588 8.53a2.265 2.265 0 1 0 0-4.53 2.265 2.265 0 0 0 0 4.53Zm3.765-2.265c0 1.12-.489 2.125-1.264 2.814a6.59 6.59 0 0 1 4.088 6.098V16.5H17.5v-1c0-1.953-1.4-3.579-3.25-3.93V9.183c.536-.261.924-.825.924-1.513 0-.954-.748-1.67-1.6-1.67-.227 0-.447.051-.647.144V4.569a3.06 3.06 0 0 1 .647-.069c1.712 0 3.1 1.42 3.1 3.17a3.187 3.187 0 0 1-1.371 2.632A5.502 5.502 0 0 1 19 15.5V18H1v-2.823a6.59 6.59 0 0 1 4.088-6.098 3.765 3.765 0 1 1 6.265-2.815ZM8 16.5h4.677v-1.323a5.088 5.088 0 1 0-10.177 0V16.5H8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPeople20);
