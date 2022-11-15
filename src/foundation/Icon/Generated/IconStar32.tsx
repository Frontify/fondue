import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconStar32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconStar32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m16 3.14.906 1.937 3.114 6.658 7.104.886 2.149.269-1.598 1.462-5.329 4.874 1.332 7.09.4 2.123-1.878-1.07-6.2-3.536-6.2 3.536-1.878 1.07.4-2.124 1.331-7.089-5.328-4.874-1.598-1.462 2.149-.269 7.104-.886 3.114-6.658L16 3.139Zm0 4.72-2.442 5.223-.234.5-.548.069-5.503.686 4.14 3.788.412.375-.103.547-1.036 5.513 4.818-2.748.496-.282.495.282 4.819 2.748-1.036-5.513-.103-.546.41-.376 4.142-3.788-5.503-.686-.548-.069-.234-.5L16 7.86Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconStar32);
