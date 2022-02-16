import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPlayFrame32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlayFrame32"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M11.897 14.82v7.024c.053.82.444 1.482 1.124 1.802.29.143.593.205.91.205.426 0 .856-.134 1.198-.419l5.139-3.505c.541-.379.86-1.002.86-1.647 0-.667-.339-1.3-.914-1.666l-5.2-3.45c-.608-.405-1.344-.433-2.004-.128-.712.41-1.113 1.053-1.113 1.783Zm7.132 3.47-5.08-3.371-.003 6.843 5.083-3.473Z" />
                <path d="M5.743 3.6h20.513c1.7 0 3.077 1.378 3.077 3.077v18.462a3.076 3.076 0 0 1-3.077 3.076H5.743a3.077 3.077 0 0 1-3.077-3.076V6.677c0-1.7 1.378-3.077 3.077-3.077Zm-1.025 7.18v14.359c0 .566.459 1.025 1.025 1.025h20.513c.567 0 1.026-.46 1.026-1.026V10.78H4.718Zm22.564-2.052H4.718V6.677c0-.566.459-1.026 1.025-1.026h20.513c.567 0 1.026.46 1.026 1.026v2.051Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlayFrame32);
export default Memo;
