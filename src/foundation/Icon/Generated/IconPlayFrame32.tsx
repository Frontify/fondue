import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlayFrame32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlayFrame32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M25 6H7a2 2 0 0 0-2 2v1h22V8a2 2 0 0 0-2-2ZM5 24V11h22v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2ZM7 4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H7Zm8.065 9.279c-1.334-.787-3.017.174-3.017 1.722v6.288c0 1.53 1.649 2.493 2.982 1.742l5.45-3.07c1.342-.756 1.362-2.682.035-3.465l-5.45-3.217Zm-1.017 8.01V15l5.45 3.217-5.45 3.07Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlayFrame32);
