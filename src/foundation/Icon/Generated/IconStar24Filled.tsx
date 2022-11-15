import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconStar24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconStar24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.678 3.679 12 2.249l-.678 1.43-2.41 5.081-5.504.677-1.63.201 1.22 1.1 4.121 3.718-1.03 5.404-.302 1.584 1.407-.79L12 17.95l4.806 2.703 1.407.79-.302-1.584-1.03-5.404 4.121-3.717 1.22-1.101-1.63-.2-5.504-.678-2.41-5.081Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconStar24Filled);
