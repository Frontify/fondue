import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFaceNeutral16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFaceNeutral16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M6.788 6.485a.91.91 0 1 1-1.818 0 .91.91 0 0 1 1.818 0Zm3.333.909a.91.91 0 1 0 0-1.818.91.91 0 0 0 0 1.818Zm-5.757 2.727c0 .335.27.606.606.606h6.06a.606.606 0 1 0 0-1.212H4.97a.606.606 0 0 0-.606.606Z" />
                <path
                    fillRule="evenodd"
                    d="M5.402 14.146c.812.347 1.678.52 2.598.52.92 0 1.786-.173 2.598-.52a6.69 6.69 0 0 0 2.122-1.426 6.69 6.69 0 0 0 1.426-2.122c.347-.812.52-1.678.52-2.598 0-.92-.173-1.786-.52-2.597A6.691 6.691 0 0 0 12.72 3.28a6.69 6.69 0 0 0-2.122-1.426A6.535 6.535 0 0 0 8 1.334c-.92 0-1.786.173-2.598.52A6.69 6.69 0 0 0 3.28 3.28a6.69 6.69 0 0 0-1.426 2.123A6.534 6.534 0 0 0 1.334 8c0 .92.173 1.786.52 2.598A6.69 6.69 0 0 0 3.28 12.72a6.69 6.69 0 0 0 2.122 1.426Zm4.824-.879c-.694.3-1.436.45-2.226.45s-1.532-.15-2.227-.45c-.694-.3-1.3-.707-1.816-1.224a5.775 5.775 0 0 1-1.224-1.816A5.562 5.562 0 0 1 2.283 8c0-.79.15-1.532.45-2.226.3-.695.707-1.3 1.224-1.817a5.775 5.775 0 0 1 1.816-1.224A5.557 5.557 0 0 1 8 2.284c.79 0 1.532.15 2.226.45.695.299 1.3.707 1.817 1.223a5.774 5.774 0 0 1 1.224 1.817c.3.694.45 1.436.45 2.226s-.15 1.532-.45 2.227a5.79 5.79 0 0 1-1.224 1.816 5.776 5.776 0 0 1-1.816 1.224Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconFaceNeutral16);
export default Memo;
