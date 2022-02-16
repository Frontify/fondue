import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeartCircleStack16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconHeartCircleStack16"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M9.51 6.067c.889.598.898 1.856.326 3.08-.527 1.13-1.91 2.501-2.805 2.53h-.043c-.89-.03-2.272-1.4-2.8-2.53-.571-1.224-.562-2.482.327-3.08.827-.556 1.69-.375 2.498.432.806-.807 1.67-.988 2.497-.432Zm-.551.82c.368.248.374 1.005-.018 1.842-.386.828-1.514 1.947-1.938 1.96-.406-.014-1.533-1.133-1.92-1.96-.39-.837-.385-1.594-.017-1.842.457-.307.927-.145 1.557.663a.494.494 0 0 0 .779 0c.63-.808 1.1-.97 1.557-.663Z" />
                <path d="M10.484 12.961a5.679 5.679 0 1 1-4.922-9.987l-.009-.01a5.679 5.679 0 1 1 4.93 9.998Zm1.61-1.957a4.691 4.691 0 0 0-4.042-8.121 5.68 5.68 0 0 1 4.043 8.12Zm-5.082 2.154a4.691 4.691 0 1 0 0-9.383 4.691 4.691 0 0 0 0 9.383Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHeartCircleStack16);
export default Memo;
