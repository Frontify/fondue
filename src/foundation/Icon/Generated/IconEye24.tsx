import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconEye24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconEye24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.35 12.367c-1.13 2.107-3.857 5.972-8.35 5.972-4.493 0-7.22-3.865-8.35-5.972a.76.76 0 0 1 0-.735C4.78 9.525 7.507 5.66 12 5.66c4.493 0 7.22 3.865 8.35 5.972a.76.76 0 0 1 0 .735Zm-18.022.71a2.26 2.26 0 0 1 0-2.154C3.481 8.774 6.587 4.16 12 4.16s8.519 4.614 9.672 6.763a2.26 2.26 0 0 1 0 2.154c-1.153 2.148-4.259 6.762-9.672 6.762s-8.519-4.614-9.672-6.762Zm8.953 1.606a2.778 2.778 0 0 1-1.964-3.402.75.75 0 0 0-1.449-.389 4.278 4.278 0 1 0 3.024-3.025.75.75 0 1 0 .39 1.449 2.778 2.778 0 1 1 0 5.367Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconEye24);
