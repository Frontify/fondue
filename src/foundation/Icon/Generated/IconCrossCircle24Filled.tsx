import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCrossCircle24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCrossCircle24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-4.243-5.757a.75.75 0 0 1 0-1.061L10.94 12 7.757 8.818a.75.75 0 0 1 1.061-1.06L12 10.938l3.182-3.182a.75.75 0 0 1 1.06 1.061L13.062 12l3.182 3.182a.75.75 0 0 1-1.061 1.06L12 13.062l-3.182 3.182a.75.75 0 0 1-1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCrossCircle24Filled);
