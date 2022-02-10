import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEnvelope20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconEnvelope20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.667 5c0-.92.746-1.667 1.666-1.667h13.334c.92 0 1.666.747 1.666 1.667v10c0 .92-.746 1.667-1.666 1.667H3.333c-.92 0-1.666-.746-1.666-1.667V5ZM16.2 4.583H3.564l5.692 5.497a1.042 1.042 0 0 0 1.46-.013L16.2 4.583Zm-13.283 9.95 4.495-4.496-4.495-4.34v8.836Zm5.395-3.627L3.8 15.416h12.4l-4.533-4.532-.067.067a2.292 2.292 0 0 1-3.212.028l-.076-.073Zm8.771-5.439v9.066L12.551 10l4.532-4.533Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconEnvelope20);
export default Memo;
