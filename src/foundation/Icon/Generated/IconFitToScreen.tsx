import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFitToScreen(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFitToScreen"
            {...props}
        >
            <path d="M6 3.15h12A2.85 2.85 0 0120.85 6v12A2.85 2.85 0 0118 20.85H6A2.85 2.85 0 013.15 18V6A2.85 2.85 0 016 3.15zm0 1.7A1.15 1.15 0 004.85 6v12c0 .635.515 1.15 1.15 1.15h12A1.15 1.15 0 0019.15 18V6A1.15 1.15 0 0018 4.85H6zM10 6h4a2 2 0 012 2v8a2 2 0 01-2 2h-4a2 2 0 01-2-2V8a2 2 0 012-2zm0 1.7a.3.3 0 00-.3.3v8a.3.3 0 00.3.3h4a.3.3 0 00.3-.3V8a.3.3 0 00-.3-.3h-4z" />
        </svg>
    );
}

const MemoIconFitToScreen = React.memo(IconFitToScreen);
export default MemoIconFitToScreen;
