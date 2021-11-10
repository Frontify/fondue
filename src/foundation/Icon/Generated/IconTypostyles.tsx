import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypostyles(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTypostyles"
            {...props}
        >
            <path d="M8.923 17.308h2.308v1.538H5.077v-1.538h2.308V6.538H3.538v1.539H2V5h12.308v3.077h-1.539V6.538H8.923v10.77zm9.23 0v1.538h-1.538v-7.692H12.77V9.615H22v1.539h-3.846v6.154z" />
        </svg>
    );
}

const MemoIconTypostyles = React.memo(IconTypostyles);
export default MemoIconTypostyles;
