import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const { size } = props;
    const style =
        typeof size === "string"
            ? {
                  width: size,
                  height: size,
              }
            : {
                  width: IconSizeMap[size || IconSize.Size16],
                  height: IconSizeMap[size || IconSize.Size16],
              };
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            style={style}
            name="IconTextAlignRight"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.662 6a1 1 0 01-1 1h-16a1 1 0 010-2h16a1 1 0 011 1zM5.662 18a1 1 0 011-1h13a1 1 0 110 2h-13a1 1 0 01-1-1zM20.662 10a1 1 0 01-1 1h-13a1 1 0 110-2h13a1 1 0 011 1zM20.662 14a1 1 0 01-1 1h-16a1 1 0 110-2h16a1 1 0 011 1z"
            />
        </svg>
    );
}

const MemoIconTextAlignRight = React.memo(IconTextAlignRight);
export default MemoIconTextAlignRight;
