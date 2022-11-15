import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowOutShare20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowOutShare20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.36 6.359a.75.75 0 0 1-1.06 0l-1.55-1.55V13a.75.75 0 0 1-1.5 0V4.812L7.703 6.36a.75.75 0 0 1-1.06-1.06l2.828-2.83.53-.53.53.53 2.83 2.83a.75.75 0 0 1 0 1.06ZM3.25 11.25A2.75 2.75 0 0 1 6 8.5h.5a.75.75 0 1 1 0 1.5H6c-.69 0-1.25.56-1.25 1.25v4c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25v-4c0-.69-.56-1.25-1.25-1.25h-.5a.75.75 0 0 1 0-1.5h.5a2.75 2.75 0 0 1 2.75 2.75v4A2.75 2.75 0 0 1 14 18H6a2.75 2.75 0 0 1-2.75-2.75v-4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowOutShare20);
