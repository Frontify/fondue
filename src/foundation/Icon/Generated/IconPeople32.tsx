import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPeople32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPeople32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13 14a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm5.5-3.5c0 1.694-.766 3.21-1.97 4.218A9.002 9.002 0 0 1 22 23v2h5v-1.5a5.502 5.502 0 0 0-4-5.293V15.5a2.5 2.5 0 0 0-2-4.45V9.027a4.5 4.5 0 0 1 3.665 7.671A7.501 7.501 0 0 1 29 23.5V27H4v-4a9.002 9.002 0 0 1 5.47-8.282A5.5 5.5 0 1 1 18.5 10.5ZM14 25h6v-2a7 7 0 1 0-14 0v2h8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPeople32);
