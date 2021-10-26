import React from "react";
import { IconProps } from "src/foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "src/foundation/Icon/IconSize";

function IconUnknownSimple(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconUnknownSimple"
            {...props}
        >
            <path d="M8 11.739a.95.95 0 110 1.899.95.95 0 010-1.9zm.04-9.377c1.925 0 3.305 1.453 3.305 3.301 0 .917-.395 1.587-1.108 2.21l-.109.093c.018-.015-.678.527-.743.603l-.123.146c-.387.465-.51.76-.51 1.446a.712.712 0 01-1.424 0c0-.99.226-1.586.75-2.247l.19-.229.032-.038c.1-.12.214-.223.377-.353l.438-.34.103-.084c.487-.405.703-.747.703-1.207 0-1.077-.76-1.876-1.88-1.876-.935 0-1.703.61-1.983 1.716a.712.712 0 01-1.381-.35c.438-1.732 1.77-2.79 3.363-2.79z" />
        </svg>
    );
}

const MemoIconUnknownSimple = React.memo(IconUnknownSimple);
export default MemoIconUnknownSimple;
