import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHome12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconHome12"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M7.906 7.097c.4-.857.394-1.725-.204-2.128-.587-.395-1.2-.247-1.781.373-.582-.62-1.195-.768-1.782-.373-.598.403-.604 1.27-.204 2.128.373.799 1.362 1.78 1.97 1.8h.027c.613-.019 1.601-1 1.974-1.8ZM7.207 5.64c.29.188.294.715.02 1.28-.266.549-1.029 1.278-1.348 1.287-.308-.01-1.07-.739-1.336-1.287-.274-.565-.27-1.092.02-1.28.342-.221.695-.104 1.133.438a.247.247 0 0 0 .378 0c.438-.542.791-.66 1.133-.438Z" />
                <path d="M1.07 5.342c.125.177.37.22.546.096l.306-.213v4.08c0 .724.588 1.313 1.313 1.313h5.53c.725 0 1.313-.589 1.313-1.314v-4.08l.306.214a.392.392 0 0 0 .449-.641L6.225 1.57a.392.392 0 0 0-.45 0L1.167 4.797a.392.392 0 0 0-.096.545Zm8.225-.666L6 2.37 2.705 4.676v4.628c0 .293.237.53.53.53h5.53a.53.53 0 0 0 .53-.53V4.676Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHome12);
export default Memo;
