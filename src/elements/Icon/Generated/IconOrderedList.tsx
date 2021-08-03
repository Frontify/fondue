import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconOrderedList(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M5.953 25.312q0 1.25-.852 1.969T2.984 28q-1.656 0-2.688-1.031l.891-1.375q.766.703 1.656.703.453 0 .789-.227t.336-.664q0-1-1.641-.875l-.406-.875q.125-.156.508-.68t.664-.844.578-.602v-.016q-.25 0-.758.016t-.758.016v.828H.499v-2.375h5.203v1.375l-1.484 1.797q.797.187 1.266.766t.469 1.375zm.031-9.796V18H.328q-.094-.562-.094-.844 0-.797.367-1.453t.883-1.062 1.031-.742.883-.68.367-.703q0-.391-.227-.602t-.617-.211q-.719 0-1.266.906l-1.328-.922q.375-.797 1.117-1.242T3.092 10q1.141 0 1.922.648t.781 1.758q0 .781-.531 1.43t-1.172 1.008-1.18.789-.555.82h1.984v-.938h1.641zM28 20.5v3q0 .203-.148.352T27.5 24h-19q-.203 0-.352-.148T8 23.5v-3q0-.219.141-.359T8.5 20h19q.203 0 .352.148T28 20.5zM6 6.453V8H.766V6.453h1.672q0-.641.008-1.906t.008-1.891v-.187h-.031q-.125.266-.781.844L.533 2.125 2.658.141h1.656v6.312h1.687zM28 12.5v3q0 .203-.148.352T27.5 16h-19q-.203 0-.352-.148T8 15.5v-3q0-.219.141-.359T8.5 12h19q.203 0 .352.148T28 12.5zm0-8v3q0 .203-.148.352T27.5 8h-19q-.203 0-.352-.148T8 7.5v-3q0-.203.148-.352T8.5 4h19q.203 0 .352.148T28 4.5z" />
        </svg>
    );
}

const MemoIconOrderedList = React.memo(IconOrderedList);
export default MemoIconOrderedList;
