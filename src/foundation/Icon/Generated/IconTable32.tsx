import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTable32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTable32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.744 4h20.513c1.699 0 3.076 1.343 3.076 3v18c0 1.657-1.377 3-3.076 3H5.743c-1.7 0-3.077-1.343-3.077-3V7c0-1.657 1.377-3 3.077-3Zm-1.026 7.5V15h6.154v-3.5H4.718Zm8.205 0V15h6.154v-3.5h-6.154Zm8.205 0V15h6.154v-3.5h-6.154Zm6.154-2H4.718V7c0-.552.46-1 1.026-1h20.512c.567 0 1.026.448 1.026 1v2.5ZM12.923 17h6.154v3.5h-6.154V17Zm-8.205 0h6.154v3.5H4.718V17Zm22.564 0h-6.154v3.5h6.154V17ZM4.718 22.5V25c0 .552.46 1 1.026 1h5.128v-3.5H4.718Zm8.205 0V26h6.154v-3.5h-6.154Zm8.205 0V26h5.128c.567 0 1.026-.448 1.026-1v-2.5h-6.154Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTable32);
export default Memo;
