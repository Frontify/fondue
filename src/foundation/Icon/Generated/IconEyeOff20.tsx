import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEyeOff20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconEyeOff20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M3.518 16.482a.625.625 0 0 1 0-.884l12.08-12.08a.625.625 0 0 1 .884.884l-1.003 1.002a9.938 9.938 0 0 1 3.46 3.99c.182.383.182.828 0 1.212a9.897 9.897 0 0 1-8.94 5.644 9.855 9.855 0 0 1-4.357-1.009l-1.24 1.24a.625.625 0 0 1-.884 0Zm9.24-8.356 1.817-1.818a8.688 8.688 0 0 1 2.908 3.004c.247.425.247.95 0 1.376A8.643 8.643 0 0 1 10 15a8.619 8.619 0 0 1-3.416-.7l1.542-1.543a3.333 3.333 0 0 0 4.63-4.63Zm-.91.91-2.812 2.811a2.083 2.083 0 0 0 2.811-2.811Z"
                    clipRule="evenodd"
                />
                <path d="M12.094 5.255A8.664 8.664 0 0 0 10 5a8.643 8.643 0 0 0-7.483 4.312 1.37 1.37 0 0 0 0 1.376 8.685 8.685 0 0 0 1.887 2.257l-.886.887a9.929 9.929 0 0 1-2.457-3.226 1.408 1.408 0 0 1 0-1.212A9.897 9.897 0 0 1 10 3.75c1.084 0 2.127.174 3.103.496l-1.009 1.01Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEyeOff20);
export default Memo;
