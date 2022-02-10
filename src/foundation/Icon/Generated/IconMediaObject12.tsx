import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObject12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMediaObject12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M5.792 2H2.597C1.715 2 1 2.716 1 3.6v4.8c0 .884.715 1.6 1.597 1.6h3.195A1.6 1.6 0 0 0 7.39 8.4V3.6A1.6 1.6 0 0 0 5.792 2ZM1.8 3.6a.8.8 0 0 1 .798-.8h3.195a.8.8 0 0 1 .799.8v4.8a.8.8 0 0 1-.799.8H2.597a.8.8 0 0 1-.798-.8V3.6Z"
                    clipRule="evenodd"
                />
                <path d="M8.388 4a.4.4 0 0 1 0-.8H10.6a.4.4 0 0 1 0 .8H8.388Zm-.399 1.2c0 .22.178.4.399.4h1.414a.4.4 0 0 0 0-.8H8.388a.4.4 0 0 0-.4.4Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMediaObject12);
export default Memo;
