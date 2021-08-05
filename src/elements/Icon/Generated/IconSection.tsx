import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconSection(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
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
            <path d="M2.833 17.665a.833.833 0 010-1.667h18.334a.833.833 0 110 1.667H2.833zM10 14.33H8.204v-3.485H4.796v3.485H3V6h1.796v3.333h3.408V6H10v8.331zm5.7 0h-1.74V7.727h-.086L12 9.052V7.398L13.96 6h1.74v8.331z" />
        </svg>
    );
}

const MemoIconSection = React.memo(IconSection);
export default MemoIconSection;
