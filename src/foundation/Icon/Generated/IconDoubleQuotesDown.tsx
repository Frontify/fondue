import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoubleQuotesDown(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            viewBox="0 0 16 12"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            style={style}
            name="IconDoubleQuotesDown"
            {...props}
        >
            <path d="M1.435 12V9.561h1.414c1.171 0 1.757-.585 1.757-1.756V6.244h-.683c-.943 0-1.724-.293-2.342-.878C.931 4.78.606 4.049.606 3.17c0-.943.325-1.708.975-2.293C2.2.293 2.98 0 3.923 0c.943 0 1.723.309 2.341.927.618.618.927 1.398.927 2.341v4.537C7.19 10.602 5.793 12 2.996 12H1.435zm8.488 0V9.561h1.414c1.171 0 1.756-.585 1.756-1.756V6.244h-.683c-.943 0-1.723-.293-2.341-.878-.65-.586-.976-1.317-.976-2.195 0-.943.326-1.708.976-2.293C10.687.293 11.467 0 12.41 0c.944 0 1.724.309 2.342.927.618.618.927 1.398.927 2.341v4.537c0 2.797-1.399 4.195-4.195 4.195H9.923z" />
        </svg>
    );
}

const MemoIconDoubleQuotesDown = React.memo(IconDoubleQuotesDown);
export default MemoIconDoubleQuotesDown;
