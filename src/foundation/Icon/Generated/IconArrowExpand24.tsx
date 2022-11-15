import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowExpand24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconArrowExpand24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13 4.25a.75.75 0 0 0 0 1.5h4.19l-4.22 4.22a.75.75 0 0 0 1.06 1.06l4.22-4.22V11H19h-.75a.75.75 0 0 0 1.5 0H19h.75V4.25H13Zm-1.97 8.72a.75.75 0 0 1 0 1.06l-4.22 4.22H11a.75.75 0 0 1 0 1.5H4.25V13h1.5v4.19l4.22-4.22a.75.75 0 0 1 1.06 0ZM5 13h-.75a.75.75 0 0 1 1.5 0H5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowExpand24);
