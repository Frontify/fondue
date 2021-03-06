import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEmojiUnhappy(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconEmojiUnhappy"
            {...props}
        >
            <path d="M12 22c-1.38 0-2.679-.26-3.896-.781A10.035 10.035 0 0 1 4.92 19.08a10.035 10.035 0 0 1-2.139-3.184A9.801 9.801 0 0 1 2 12c0-1.38.26-2.679.781-3.896A10.035 10.035 0 0 1 4.92 4.92 10.035 10.035 0 0 1 8.104 2.78 9.801 9.801 0 0 1 12 2c1.38 0 2.679.26 3.896.781A10.035 10.035 0 0 1 19.08 4.92a10.035 10.035 0 0 1 2.139 3.184A9.801 9.801 0 0 1 22 12c0 1.38-.26 2.679-.781 3.896a10.035 10.035 0 0 1-2.139 3.184 10.035 10.035 0 0 1-3.184 2.139A9.801 9.801 0 0 1 12 22Zm0-1.426a8.343 8.343 0 0 0 3.34-.674 8.663 8.663 0 0 0 2.724-1.836A8.663 8.663 0 0 0 19.9 15.34a8.343 8.343 0 0 0 .674-3.34 8.343 8.343 0 0 0-.674-3.34 8.663 8.663 0 0 0-1.836-2.724A8.663 8.663 0 0 0 15.34 4.1 8.343 8.343 0 0 0 12 3.426a8.343 8.343 0 0 0-3.34.674 8.663 8.663 0 0 0-2.724 1.836A8.663 8.663 0 0 0 4.1 8.66 8.343 8.343 0 0 0 3.426 12c0 1.185.224 2.298.674 3.34a8.663 8.663 0 0 0 1.836 2.724A8.663 8.663 0 0 0 8.66 19.9a8.343 8.343 0 0 0 3.34.674ZM8.818 10.182a1.364 1.364 0 1 1 0-2.727 1.364 1.364 0 0 1 0 2.727Zm6.364 0a1.364 1.364 0 1 1 0-2.727 1.364 1.364 0 0 1 0 2.727Zm-8.54 5.502c1.065-2.13 2.897-3.23 5.358-3.23s4.293 1.1 5.359 3.23a.91.91 0 0 1-1.627.813c-.753-1.506-1.95-2.224-3.732-2.224-1.781 0-2.98.718-3.732 2.224a.91.91 0 0 1-1.627-.813Z" />
        </svg>
    );
}

const Memo = memo(IconEmojiUnhappy);
export default Memo;
