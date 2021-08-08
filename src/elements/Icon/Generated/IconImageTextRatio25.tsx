import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconImageTextRatio25(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconImageTextRatio25"
            {...props}
        >
            <path d="M5.692 3.005h6.023a2.75 2.75 0 012.75 2.75v12.49a2.75 2.75 0 01-2.75 2.75H5.692a2.75 2.75 0 01-2.75-2.75V5.755a2.75 2.75 0 012.75-2.75zm0 1.5c-.69 0-1.25.56-1.25 1.25v12.49c0 .69.56 1.25 1.25 1.25h6.023c.69 0 1.25-.56 1.25-1.25V5.755c0-.69-.56-1.25-1.25-1.25H5.692zm11.01.97a.75.75 0 010-1.5h3.606a.75.75 0 110 1.5h-3.606zm0 3.03a.75.75 0 010-1.5h3.606a.75.75 0 110 1.5h-3.606zm.003 3.033a.75.75 0 110-1.5h2.118a.75.75 0 010 1.5h-2.118z" />
        </svg>
    );
}

const MemoIconImageTextRatio25 = React.memo(IconImageTextRatio25);
export default MemoIconImageTextRatio25;
