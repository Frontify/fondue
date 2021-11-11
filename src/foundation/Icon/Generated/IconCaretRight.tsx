import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCaretRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            style={style}
            name="IconCaretRight"
            {...props}
        >
            <path d="M8.48 5.138a.83.83 0 01-.23-.576.83.83 0 01.23-.576.751.751 0 011.093 0l7.677 8.034-7.677 8.035a.75.75 0 01-1.053-.043.84.84 0 01-.04-1.101l6.575-6.89L8.48 5.137z" />
        </svg>
    );
}

const MemoIconCaretRight = React.memo(IconCaretRight);
export default MemoIconCaretRight;
