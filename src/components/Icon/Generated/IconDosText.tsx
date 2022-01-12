import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconDosText(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            <path d="m7.498 6.488.707-.707a.714.714 0 1 1 1.01 1.01l-.707.707.707.707a.714.714 0 1 1-1.01 1.01l-.707-.707-.707.707a.714.714 0 1 1-1.01-1.01l.707-.707-.707-.707a.714.714 0 0 1 1.01-1.01l.707.707Zm-.14 6.226A5.357 5.357 0 1 1 7.357 2a5.357 5.357 0 0 1 0 10.714Zm0-1.428a3.929 3.929 0 1 0 0-7.857 3.929 3.929 0 0 0 0 7.857ZM16.642 22a5.357 5.357 0 1 1 0-10.714 5.357 5.357 0 0 1 0 10.714Zm0-1.429a3.929 3.929 0 1 0 0-7.857 3.929 3.929 0 0 0 0 7.857Zm1.416-5.497a.714.714 0 1 1 1.025.995l-2.535 2.615a.714.714 0 0 1-1.048-.023l-1.036-1.17a.714.714 0 1 1 1.07-.947l.525.593 1.999-2.063Z" />
        </svg>
    );
}

const Memo = memo(IconDosText);
export default Memo;
