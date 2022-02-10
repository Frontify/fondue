import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentList12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDocumentList12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5.403 9.182a.456.456 0 1 1 0-.91h2.74a.456.456 0 1 1 0 .91h-2.74Zm-.913-.455a.456.456 0 1 1-.911-.002.456.456 0 0 1 .91.002Zm.913-1.363a.456.456 0 1 1 0-.91h2.74a.456.456 0 1 1 0 .91h-2.74ZM4.49 6.91a.456.456 0 1 1-.911-.003.456.456 0 0 1 .91.002Z" />
                <path
                    fillRule="evenodd"
                    d="M1.75 2.54c0-.85.695-1.54 1.544-1.54h3.382c.214 0 .511.118.67.266l2.621 2.468c.156.147.283.439.283.652v5.078c0 .848-.696 1.536-1.55 1.536H3.3c-.856 0-1.55-.687-1.55-1.54V2.54Zm7.727 2.69H6.385A.384.384 0 0 1 6 4.847V1.77H3.298a.771.771 0 0 0-.775.766v6.93c0 .424.345.766.77.766h5.413a.768.768 0 0 0 .771-.766V5.23Zm0-.857v.089H6.773v-2.62l2.704 2.53Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentList12);
export default Memo;
