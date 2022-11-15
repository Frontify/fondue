import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlay20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlay20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.823 3.582a.25.25 0 0 0-.37.22v12.447c0 .189.202.31.369.22l11.455-6.194a.25.25 0 0 0 0-.44L4.824 3.583Zm-1.87.22a1.75 1.75 0 0 1 2.589-1.537L16.996 8.52c1.219.665 1.215 2.416-.006 3.076L5.535 17.788a1.75 1.75 0 0 1-2.582-1.54V3.802Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlay20);
