import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconFullwidth(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconFullwidth"
            {...props}
        >
            <path d="M11.231 11.132h4.12l-1.094-1.095a.85.85 0 0 1 1.202-1.203l2.475 2.475a.848.848 0 0 1 .246.672.848.848 0 0 1-.246.672l-2.475 2.475a.85.85 0 1 1-1.202-1.202l1.094-1.095H8.694l1.095 1.095a.85.85 0 1 1-1.202 1.202l-2.475-2.475a.848.848 0 0 1-.246-.671.848.848 0 0 1 .246-.672l2.475-2.475a.85.85 0 1 1 1.202 1.202l-1.095 1.095h2.537ZM6 3.15h12A2.85 2.85 0 0 1 20.85 6v12A2.85 2.85 0 0 1 18 20.85H6A2.85 2.85 0 0 1 3.15 18V6A2.85 2.85 0 0 1 6 3.15Zm0 1.7A1.15 1.15 0 0 0 4.85 6v12c0 .635.515 1.15 1.15 1.15h12A1.15 1.15 0 0 0 19.15 18V6A1.15 1.15 0 0 0 18 4.85H6Z" />
        </svg>
    );
}

const Memo = memo(IconFullwidth);
export default Memo;
