import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPin32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPin32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22.604 4.931a3 3 0 0 0-4.602.435l-3.784 5.565-4.23.719c-2.402.408-3.342 3.356-1.62 5.079l2.767 2.766a.914.914 0 0 0-.022.022l-6.807 6.807a1 1 0 1 0 1.414 1.414l6.807-6.807a.914.914 0 0 0 .021-.022l2.723 2.723c1.723 1.722 4.671.782 5.08-1.62l.717-4.23 5.566-3.784a3 3 0 0 0 .435-4.602L22.604 4.93Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPin32Filled);
