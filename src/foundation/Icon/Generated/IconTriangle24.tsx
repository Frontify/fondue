import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTriangle24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTriangle24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 3.25a.75.75 0 0 1 .651.378l9 15.75A.75.75 0 0 1 21 20.5H3a.75.75 0 0 1-.651-1.122l9-15.75A.75.75 0 0 1 12 3.25ZM4.292 19h15.416L12 5.512 4.292 19Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTriangle24);
