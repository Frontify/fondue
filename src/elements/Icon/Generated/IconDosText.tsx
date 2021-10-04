import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconDosText(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconDosText"
            {...props}
        >
            <path d="M7.498 6.488l.707-.707a.714.714 0 111.01 1.01l-.707.707.707.707a.714.714 0 11-1.01 1.01l-.707-.707-.707.707a.714.714 0 11-1.01-1.01l.707-.707-.707-.707a.714.714 0 011.01-1.01l.707.707zm-.14 6.226A5.357 5.357 0 117.357 2a5.357 5.357 0 010 10.714zm0-1.428a3.929 3.929 0 100-7.857 3.929 3.929 0 000 7.857zM16.642 22a5.357 5.357 0 110-10.714 5.357 5.357 0 010 10.714zm0-1.429a3.929 3.929 0 100-7.857 3.929 3.929 0 000 7.857zm1.416-5.497a.714.714 0 111.025.995l-2.535 2.615a.714.714 0 01-1.048-.023l-1.036-1.17a.714.714 0 111.07-.947l.525.593 1.999-2.063z" />
        </svg>
    );
}

const MemoIconDosText = React.memo(IconDosText);
export default MemoIconDosText;
