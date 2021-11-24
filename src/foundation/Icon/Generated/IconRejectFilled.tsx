import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRejectFilled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconRejectFilled"
            {...props}
        >
            <path d="M12 22c-1.38 0-2.679-.26-3.896-.781A10.035 10.035 0 014.92 19.08a10.035 10.035 0 01-2.139-3.184A9.801 9.801 0 012 12c0-1.38.26-2.679.781-3.896A10.035 10.035 0 014.92 4.92 10.035 10.035 0 018.104 2.78 9.801 9.801 0 0112 2c1.38 0 2.679.26 3.896.781A10.035 10.035 0 0119.08 4.92a10.035 10.035 0 012.139 3.184A9.801 9.801 0 0122 12c0 1.38-.26 2.679-.781 3.896a10.035 10.035 0 01-2.139 3.184 10.035 10.035 0 01-3.184 2.139A9.801 9.801 0 0112 22zm3.535-6.465a.718.718 0 000-1.015L13.015 12l2.52-2.52a.718.718 0 10-1.015-1.015L12 10.985l-2.52-2.52A.718.718 0 108.465 9.48l2.52 2.52-2.52 2.52a.718.718 0 101.015 1.015l2.52-2.52 2.52 2.52c.28.28.735.28 1.015 0z" />
        </svg>
    );
}

const MemoIconRejectFilled = React.memo(IconRejectFilled);
export default MemoIconRejectFilled;
