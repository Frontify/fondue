import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPills(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconPills"
            {...props}
        >
            <path d="M3 10.5V12h3v-1.5H3zM3 9h3a1.5 1.5 0 011.5 1.5V12A1.5 1.5 0 016 13.5H3A1.5 1.5 0 011.5 12v-1.5A1.5 1.5 0 013 9zm7.5 1.5V12h3v-1.5h-3zm0-1.5h3a1.5 1.5 0 011.5 1.5V12a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 12v-1.5A1.5 1.5 0 0110.5 9zm7.5 1.5V12h3v-1.5h-3zM18 9h3a1.5 1.5 0 011.5 1.5V12a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-1.5A1.5 1.5 0 0118 9z" />
        </svg>
    );
}

const MemoIconPills = React.memo(IconPills);
export default MemoIconPills;
