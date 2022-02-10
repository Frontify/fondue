import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocument12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDocument12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.578 1c-1.01 0-1.828.816-1.828 1.823v6.354c0 1.005.816 1.823 1.823 1.823h4.854a1.821 1.821 0 0 0 1.823-1.82V4.453c0-.252-.147-.593-.33-.764L7.393 1.31A1.308 1.308 0 0 0 6.61 1H3.578Zm5.9 4.23H6.384A.384.384 0 0 1 6 4.847V1.77H3.438a.91.91 0 0 0-.915.906v6.65a.91.91 0 0 0 .909.906h5.136c.5 0 .91-.407.91-.91v-4.09Zm0-.768v-.09l-2.705-2.53v2.62h2.704Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocument12);
export default Memo;
