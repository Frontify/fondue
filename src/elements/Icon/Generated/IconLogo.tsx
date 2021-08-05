import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconLogo(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconLogo"
            {...props}
        >
            <path d="M16.037 12.517c.824-1.811.812-3.499-.06-4.1-1.029-.711-2.09-.333-3.408 1.402a.714.714 0 01-1.138 0c-1.318-1.735-2.38-2.113-3.408-1.403-.872.602-.884 2.29-.06 4.1.8 1.76 3.093 4.095 4.019 4.127.96-.031 3.254-2.367 4.055-4.126zm.752-5.276c1.607 1.11 1.624 3.502.548 5.867-1.002 2.203-3.66 4.91-5.305 4.963h-.073c-1.637-.054-4.294-2.76-5.296-4.963-1.076-2.365-1.06-4.757.548-5.867C8.788 6.15 10.437 6.558 12 8.269c1.563-1.71 3.212-2.117 4.789-1.028zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-1.429A8.571 8.571 0 1012 3.43a8.571 8.571 0 000 17.142z" />
        </svg>
    );
}

const MemoIconLogo = React.memo(IconLogo);
export default MemoIconLogo;
