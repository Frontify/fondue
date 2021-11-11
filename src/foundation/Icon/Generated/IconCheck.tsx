import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCheck(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCheck"
            {...props}
        >
            <path d="M18.103 5.324a1.115 1.115 0 011.572 0 1.102 1.102 0 010 1.564L8.505 19 4.28 14.109a1.102 1.102 0 01.096-1.561 1.115 1.115 0 011.569.096l2.662 3.129 9.497-10.45z" />
        </svg>
    );
}

const MemoIconCheck = React.memo(IconCheck);
export default MemoIconCheck;
