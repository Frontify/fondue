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

function IconMedia(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconMedia"
            {...props}
        >
            <path d="M20.462 6.546V5.008a.77.77 0 00-.77-.77H4.308a.77.77 0 00-.77.77v1.538h16.924zm0 1.539H3.538v10.769c0 .425.345.77.77.77h15.384a.77.77 0 00.77-.77V8.084zM4.308 2.7h15.384A2.308 2.308 0 0122 5.008v13.846a2.308 2.308 0 01-2.308 2.308H4.308A2.308 2.308 0 012 18.854V5.008A2.308 2.308 0 014.308 2.7zm4.615 13.683v-5.269c0-.547.3-1.03.834-1.337.495-.229 1.048-.208 1.503.096l3.9 2.587c.432.275.686.75.686 1.25 0 .484-.239.951-.645 1.235l-3.854 2.63a1.4 1.4 0 01-.9.313 1.52 1.52 0 01-.681-.153c-.51-.24-.804-.737-.843-1.352zm5.349-2.666l-3.81-2.528-.002 5.132 3.812-2.604z" />
        </svg>
    );
}

const MemoIconMedia = React.memo(IconMedia);
export default MemoIconMedia;
