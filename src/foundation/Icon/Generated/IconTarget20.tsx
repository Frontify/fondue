import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconTarget20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTarget20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.504 2.151 15.12 1l-.858.858-2.35 2.35-.284.284.079.393.074.37a7.311 7.311 0 1 0-3.47 13.747A7.311 7.311 0 0 0 14.748 8.22l.368.074.394.079.284-.284 2.35-2.35L19 4.88l-1.152-.384-1.759-.586-.586-1.759Zm-2.248 2.833 1.208-1.207.322.963.118.356.356.118.964.322-1.208 1.208-1.466-.294-.294-1.466Zm.867 6.709a5.811 5.811 0 0 1-5.811 5.81 5.811 5.811 0 1 1 3.544-10.415l-.828.827a4.652 4.652 0 1 0 1.06 1.06l.83-.827a5.784 5.784 0 0 1 1.205 3.545ZM8.312 8.54c.598 0 1.158.167 1.635.457l-.859.859a1.994 1.994 0 1 0 1.06 1.06l.86-.859A3.153 3.153 0 1 1 8.312 8.54Zm0 3.646a.494.494 0 1 0 0-.988.494.494 0 0 0 0 .988Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTarget20);
export default Memo;
