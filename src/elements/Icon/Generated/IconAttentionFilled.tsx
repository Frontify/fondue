import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconAttentionFilled(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
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
            name="IconAttentionFilled"
            {...props}
        >
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-3c.828 0 1.5-.624 1.5-1.393 0-.77-.672-1.393-1.5-1.393s-1.5.624-1.5 1.393c0 .77.672 1.393 1.5 1.393zm0-13c-.828 0-1.5.624-1.5 1.393 0 .04.009.078.012.117h-.007l.598 6.747h.005c.038.427.421.766.892.766.471 0 .854-.338.893-.766h.005l.598-6.747h-.008c.004-.039.012-.076.012-.117C13.5 6.623 12.828 6 12 6z" />
        </svg>
    );
}

const MemoIconAttentionFilled = React.memo(IconAttentionFilled);
export default MemoIconAttentionFilled;
