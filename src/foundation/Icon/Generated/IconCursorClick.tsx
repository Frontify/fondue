import React from "react";
import { IconProps } from "src/foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "src/foundation/Icon/IconSize";

function IconCursorClick(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconCursorClick"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.336 4a6.823 6.823 0 100 13.647 6.823 6.823 0 000-13.647zm8.324 6.823a8.323 8.323 0 10-16.647 0 8.323 8.323 0 0016.647 0z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.336 7.073a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm5.25 3.75a5.25 5.25 0 10-10.5 0 5.25 5.25 0 0010.5 0z"
            />
            <path d="M9.881 11.144a.6.6 0 01.769-.768l10.757 3.901a.6.6 0 01.052 1.106l-2.538 1.204 2.968 2.968a.4.4 0 010 .566l-2.263 2.262a.4.4 0 01-.566 0l-2.967-2.967-1.204 2.538a.6.6 0 01-1.106-.053L9.88 11.144z" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.357 16.144l2.512-1.192-6.922-2.51 2.51 6.921 1.193-2.512 3.693 3.694.707-.707-3.693-3.694zm-1.468 5.81a.6.6 0 01-1.106-.053L9.88 11.144a.6.6 0 01.769-.768l10.757 3.901a.6.6 0 01.052 1.106l-2.538 1.204 2.968 2.968a.4.4 0 010 .566l-2.263 2.262a.4.4 0 01-.566 0l-2.967-2.967-1.204 2.538z"
            />
        </svg>
    );
}

const MemoIconCursorClick = React.memo(IconCursorClick);
export default MemoIconCursorClick;
