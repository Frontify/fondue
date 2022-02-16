import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLockOpen20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLockOpen20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M9.333 13.287a1.388 1.388 0 1 1 1.389 0v.88a.694.694 0 1 1-1.389 0v-.88Z" />
                <path
                    fillRule="evenodd"
                    d="M12.805 7.222V5.14c0-1.15-.932-2.083-2.083-2.083H9.333c-1.15 0-2.083.932-2.083 2.083a.694.694 0 0 1-1.39 0 3.472 3.472 0 0 1 3.473-3.472h1.389a3.472 3.472 0 0 1 3.472 3.472v2.083h.695c1.15 0 2.083.933 2.083 2.084v6.944c0 1.15-.933 2.083-2.083 2.083H5.166a2.083 2.083 0 0 1-2.083-2.083V9.306c0-1.151.933-2.084 2.083-2.084h7.64Zm-7.639 1.39a.694.694 0 0 0-.694.694v6.944c0 .384.31.695.694.695h9.723a.695.695 0 0 0 .694-.695V9.306a.694.694 0 0 0-.694-.695H5.166Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconLockOpen20);
export default Memo;
