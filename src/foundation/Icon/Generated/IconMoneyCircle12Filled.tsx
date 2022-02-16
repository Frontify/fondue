import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMoneyCircle12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMoneyCircle12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10Zm.305-2.595v.72h-.681v-.734c-.622-.11-1.057-.498-1.187-1.128l.759-.207c.045.38.415.622.85.622.414 0 .667-.235.667-.622 0-.442-.41-.556-.878-.685-.617-.17-1.333-.369-1.333-1.385 0-.727.441-1.239 1.122-1.377v-.734h.68v.72c.63.097 1.064.491 1.187 1.059l-.778.242c-.065-.34-.337-.567-.732-.567-.383 0-.616.193-.616.56 0 .442.408.557.872.687.614.173 1.325.373 1.325 1.39 0 .76-.505 1.322-1.257 1.44Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMoneyCircle12Filled);
export default Memo;
