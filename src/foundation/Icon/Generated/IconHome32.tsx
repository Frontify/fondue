import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconHome32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconHome32"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M21.082 18.926c1.068-2.287 1.05-4.601-.544-5.675-1.564-1.053-3.2-.66-4.75.995-1.55-1.655-3.186-2.048-4.75-.995-1.594 1.074-1.611 3.388-.544 5.675.994 2.13 3.63 4.748 5.254 4.8h.072c1.632-.051 4.268-2.67 5.262-4.8Zm-1.863-3.888c.773.5.784 1.905.053 3.412-.71 1.464-2.743 3.408-3.595 3.433-.821-.026-2.854-1.97-3.563-3.433-.731-1.507-.72-2.911.053-3.412.912-.591 1.853-.277 3.021 1.167a.659.659 0 0 0 1.01 0c1.168-1.444 2.109-1.758 3.02-1.167Z" />
                <path d="M2.855 14.246c.331.472.983.587 1.455.256l.814-.57v10.879a3.502 3.502 0 0 0 3.503 3.502h14.746a3.502 3.502 0 0 0 3.502-3.502V13.932l.814.57a1.045 1.045 0 0 0 1.198-1.711L16.6 4.189a1.045 1.045 0 0 0-1.198 0L3.112 12.79c-.472.33-.587.982-.257 1.455Zm21.931-1.776L16 6.32l-8.787 6.15v12.34c0 .781.633 1.414 1.414 1.414h14.746c.78 0 1.413-.633 1.413-1.413V12.47Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHome32);
export default Memo;
