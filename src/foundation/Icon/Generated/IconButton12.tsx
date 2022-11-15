import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconButton12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconButton12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 3h8a1 1 0 0 1 1 1v2a1 1 0 0 1-.505.869l.866.597C11.754 7.1 12 6.579 12 6V4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2V7H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3.797 1.947a.5.5 0 0 0-.784.411l-.005 5.368a.5.5 0 0 0 .88.325l1.619-1.895 2.48-.256a.5.5 0 0 0 .232-.91L5.797 4.947Zm1.08 3.407L6.008 9.37l.004-3.06 2.52 1.735-1.328.137a.5.5 0 0 0-.329.172Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconButton12);
