import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBell20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconBell20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 1.5A1.5 1.5 0 0 1 11.5 3v1.189A6.003 6.003 0 0 1 16 10v5.5h.25a.75.75 0 0 1 0 1.5H11.5v.5a1.5 1.5 0 0 1-3 0V17H3.75a.75.75 0 0 1 0-1.5H4V10a6.003 6.003 0 0 1 4.5-5.811V3A1.5 1.5 0 0 1 10 1.5Zm-4.5 14h9V10a4.5 4.5 0 1 0-9 0v5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBell20);
