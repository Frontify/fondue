import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconColorScaleTall(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconColorScaleTall"
            {...props}
        >
            <path d="M4.344 9.6a.803.803 0 00-.806.8v3.2c0 .442.361.8.806.8h15.312a.803.803 0 00.806-.8v-3.2c0-.442-.361-.8-.806-.8H4.344zM4.4 8h15.2a2.4 2.4 0 012.4 2.4v3.2a2.4 2.4 0 01-2.4 2.4H4.4A2.4 2.4 0 012 13.6v-3.2A2.4 2.4 0 014.4 8z" />
        </svg>
    );
}

const MemoIconColorScaleTall = React.memo(IconColorScaleTall);
export default MemoIconColorScaleTall;
