import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconUnorderedList(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconUnorderedList"
            {...props}
        >
            <path d="M7.714 7.325a.952.952 0 110-1.905h13.334a.952.952 0 110 1.905H7.714zm0 3.865a.952.952 0 010-1.904h13.334a.952.952 0 110 1.904H7.714zm0 3.81a.952.952 0 010-1.905h13.334a.952.952 0 110 1.905H7.714zm0 3.81a.952.952 0 010-1.905h13.334a.952.952 0 010 1.905H7.714zM3.43 7.857a1.429 1.429 0 110-2.857 1.429 1.429 0 010 2.857zm0 3.81a1.429 1.429 0 110-2.857 1.429 1.429 0 010 2.857zm0 3.81a1.429 1.429 0 110-2.858 1.429 1.429 0 010 2.857zm0 3.809a1.429 1.429 0 110-2.857 1.429 1.429 0 010 2.857z" />
        </svg>
    );
}

const MemoIconUnorderedList = React.memo(IconUnorderedList);
export default MemoIconUnorderedList;
