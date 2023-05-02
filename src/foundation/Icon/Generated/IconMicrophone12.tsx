import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMicrophone12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMicrophone12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 2a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1ZM4 3a2 2 0 1 1 4 0v2a2 2 0 1 1-4 0V3Zm1.5 5.975c-1.148-.12-2.008-.653-2.587-1.425C2.267 6.69 2 5.574 2 4.5a.5.5 0 0 1 1 0c0 .926.233 1.81.713 2.45C4.178 7.57 4.903 8 6 8c1.098 0 1.823-.43 2.288-1.05C8.768 6.31 9 5.426 9 4.5a.5.5 0 0 1 1 0c0 1.074-.267 2.19-.912 3.05-.58.772-1.44 1.305-2.588 1.425V10h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V8.975Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMicrophone12);
