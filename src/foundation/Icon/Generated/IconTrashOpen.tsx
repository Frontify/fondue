import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTrashOpen(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTrashOpen"
            {...props}
        >
            <path d="m16.833 6.42 3.023 1.1a.724.724 0 1 1-.495 1.361l-11.7-4.258a.724.724 0 1 1 .496-1.36l3.245 1.18c.012-.043.025-.086.041-.13l.495-1.36a1.448 1.448 0 0 1 1.856-.865l2.722.99a1.448 1.448 0 0 1 .865 1.856l-.495 1.36a1.466 1.466 0 0 1-.053.126ZM6.448 10.416v9.412c0 .4.324.724.724.724h7.24c.4 0 .724-.324.724-.724v-9.412H6.448ZM5 8.968h11.584v10.86c0 1.2-.972 2.172-2.172 2.172h-7.24C5.972 22 5 21.028 5 19.828V8.968Zm8.299-5.52-.495 1.361 2.721.99.495-1.36-2.721-.99Zm-5.041 9.14a.724.724 0 0 1 1.448 0v5.792a.724.724 0 0 1-1.448 0v-5.792Zm3.62 0a.724.724 0 0 1 1.448 0v5.792a.724.724 0 0 1-1.448 0v-5.792Z" />
        </svg>
    );
}

const Memo = memo(IconTrashOpen);
export default Memo;
