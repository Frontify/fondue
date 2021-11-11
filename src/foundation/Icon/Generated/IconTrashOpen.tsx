import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTrashOpen(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTrashOpen"
            {...props}
        >
            <path d="M16.833 6.42l3.023 1.1a.724.724 0 11-.495 1.361l-11.7-4.258a.724.724 0 11.496-1.36l3.245 1.18c.012-.043.025-.086.041-.13l.495-1.36a1.448 1.448 0 011.856-.865l2.722.99a1.448 1.448 0 01.865 1.856l-.495 1.36a1.466 1.466 0 01-.053.126zM6.448 10.416v9.412c0 .4.324.724.724.724h7.24c.4 0 .724-.324.724-.724v-9.412H6.448zM5 8.968h11.584v10.86c0 1.2-.972 2.172-2.172 2.172h-7.24C5.972 22 5 21.028 5 19.828V8.968zm8.299-5.52l-.495 1.361 2.721.99.495-1.36-2.721-.99zm-5.041 9.14a.724.724 0 011.448 0v5.792a.724.724 0 01-1.448 0v-5.792zm3.62 0a.724.724 0 011.448 0v5.792a.724.724 0 01-1.448 0v-5.792z" />
        </svg>
    );
}

const MemoIconTrashOpen = React.memo(IconTrashOpen);
export default MemoIconTrashOpen;
