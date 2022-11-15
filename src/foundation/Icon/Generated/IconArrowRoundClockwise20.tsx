import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowRoundClockwise20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowRoundClockwise20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.893 8.5c-.817-2.677-3.493-4.17-6.22-3.44-2.791.748-4.37 3.484-3.622 6.276.748 2.793 3.484 4.373 6.274 3.625a5.4 5.4 0 0 0 2.059-1.05 4.365 4.365 0 0 0 .588-.59l.021-.029.002-.003s0 .002-.002.003h.001l.001-.002v-.001a.75.75 0 0 1 1.232.856l-.617-.426.617.427-.001.002-.002.002-.005.008-.015.02a4.25 4.25 0 0 1-.216.265 5.86 5.86 0 0 1-.647.623 6.9 6.9 0 0 1-2.628 1.344c-3.59.962-7.149-1.093-8.111-4.685-.962-3.592 1.09-7.151 4.682-8.114 2.856-.765 5.691.379 7.216 2.686V5A.75.75 0 1 1 17 5v5h-5a.75.75 0 1 1 0-1.5h2.893Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowRoundClockwise20);
