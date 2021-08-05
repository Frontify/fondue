import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconSymbols(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconSymbols"
            {...props}
        >
            <path d="M6.027 3h12.145a3 3 0 013 3v12.145a3 3 0 01-3 3H6.027a3 3 0 01-3-3V6a3 3 0 013-3zm0 1.5a1.5 1.5 0 00-1.5 1.5v12.145a1.5 1.5 0 001.5 1.5h12.145a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H6.027zm2.003 7.97L10 14.44l5.97-5.97a.75.75 0 011.06 1.06L10 16.56l-3.03-3.03a.75.75 0 011.06-1.06z" />
        </svg>
    );
}

const MemoIconSymbols = React.memo(IconSymbols);
export default MemoIconSymbols;
