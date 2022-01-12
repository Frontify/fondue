import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconSection(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconSection"
            {...props}
        >
            <path d="M2.833 17.665a.833.833 0 0 1 0-1.667h18.334a.833.833 0 1 1 0 1.667H2.833ZM10 14.33H8.204v-3.485H4.796v3.485H3V6h1.796v3.333h3.408V6H10v8.331Zm5.7 0h-1.74V7.727h-.086L12 9.052V7.398L13.96 6h1.74v8.331Z" />
        </svg>
    );
}

const Memo = memo(IconSection);
export default Memo;
