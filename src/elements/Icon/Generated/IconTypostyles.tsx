import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconTypostyles(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M8.923 17.308h2.308v1.538H5.077v-1.538h2.308V6.538H3.538v1.539H2V5h12.308v3.077h-1.539V6.538H8.923v10.77zm9.23 0v1.538h-1.538v-7.692H12.77V9.615H22v1.539h-3.846v6.154z" />
        </svg>
    );
}

const MemoIconTypostyles = React.memo(IconTypostyles);
export default MemoIconTypostyles;
