import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageLibrary(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconImageLibrary"
            {...props}
        >
            <path d="M14.949 19.934h.901c.421 0 .782-.15 1.082-.45.3-.301.451-.662.451-1.083V9.15c0-.421-.15-.782-.45-1.082-.301-.3-.662-.451-1.083-.451H5.066c-.421 0-.782.15-1.082.45-.3.301-.451.662-.451 1.083v7.827l4.238-2.471 7.178 5.428Zm-2.796 0-4.418-3.426-4.148 2.236c.072.337.246.62.523.848.277.228.595.342.956.342h7.087Zm6.781-1.55v.775c0 .637-.225 1.18-.676 1.632-.451.45-.995.676-1.632.676H4.308a2.224 2.224 0 0 1-1.632-.676A2.224 2.224 0 0 1 2 19.159V8.374c0-.625.225-1.163.676-1.614.451-.45.995-.676 1.632-.676h.776v-.776c0-.637.225-1.18.676-1.632.451-.45.995-.676 1.632-.676h12.3c.637 0 1.18.225 1.632.676.45.451.676.995.676 1.632v10.785c0 .625-.225 1.163-.676 1.614-.451.45-.995.676-1.632.676h-.758Zm0-1.534c.421 0 .782-.15 1.082-.45.3-.301.451-.662.451-1.083V6.066c0-.421-.15-.782-.45-1.082-.301-.3-.662-.451-1.083-.451H8.15c-.421 0-.782.15-1.082.45-.3.301-.451.662-.451 1.083l10.009.018c.637 0 1.181.225 1.632.676.45.451.676.989.676 1.614v8.476Zm-6.168-1.533c-.841 0-1.563-.3-2.164-.901a2.972 2.972 0 0 1-.901-2.182c0-.854.3-1.581.901-2.183a2.951 2.951 0 0 1 2.164-.901c.854 0 1.581.3 2.183.901.6.602.901 1.329.901 2.183 0 .853-.3 1.58-.901 2.182a2.972 2.972 0 0 1-2.183.901Zm0-1.55c.433 0 .8-.15 1.1-.451.301-.301.451-.662.451-1.082 0-.421-.15-.782-.45-1.083-.301-.3-.668-.45-1.1-.45-.421 0-.782.15-1.083.45-.3.301-.45.662-.45 1.083 0 .42.15.781.45 1.082.301.3.662.45 1.082.45Z" />
        </svg>
    );
}

const Memo = memo(IconImageLibrary);
export default Memo;
