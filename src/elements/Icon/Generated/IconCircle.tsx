import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconCircle(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconCircle"
            {...props}
        >
            <path d="M12 22a9.755 9.755 0 01-3.901-.789 10.093 10.093 0 01-3.172-2.138A10.093 10.093 0 012.79 15.9 9.755 9.755 0 012 12c0-1.379.263-2.682.789-3.901a10.093 10.093 0 012.138-3.172A10.093 10.093 0 018.1 2.79 9.755 9.755 0 0112 2c1.379 0 2.682.263 3.901.789a10.093 10.093 0 013.172 2.138A10.093 10.093 0 0121.21 8.1 9.755 9.755 0 0122 12a9.755 9.755 0 01-.789 3.901 10.093 10.093 0 01-2.138 3.172A10.093 10.093 0 0115.9 21.21 9.755 9.755 0 0112 22zm0-1.9c1.123 0 2.17-.211 3.149-.633a8.194 8.194 0 002.58-1.738 8.194 8.194 0 001.738-2.58c.422-.98.633-2.026.633-3.149 0-1.123-.211-2.17-.633-3.149a8.194 8.194 0 00-1.738-2.58 8.194 8.194 0 00-2.58-1.738A7.857 7.857 0 0012 3.9c-1.123 0-2.17.211-3.149.633a8.194 8.194 0 00-2.58 1.738 8.194 8.194 0 00-1.738 2.58A7.857 7.857 0 003.9 12c0 1.123.211 2.17.633 3.149a8.194 8.194 0 001.738 2.58 8.194 8.194 0 002.58 1.738c.98.422 2.026.633 3.149.633z" />
        </svg>
    );
}

const MemoIconCircle = React.memo(IconCircle);
export default MemoIconCircle;
