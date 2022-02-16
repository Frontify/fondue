import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowRoundClockwise16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconArrowRoundClockwise16"
            {...props}
        >
            <path
                fill="currentColor"
                d="m9.278 12.674.13.483-.13-.483ZM3.34 9.244l.483-.129-.483.13Zm3.428-5.939-.13-.483.13.483Zm5.449 3.545a.5.5 0 0 0 .966-.26l-.966.26Zm.009 4.468a.5.5 0 0 0-.832-.555l.832.555ZM10 6.934a.5.5 0 0 0 0 1v-1Zm3.5.5v.5h.5v-.5h-.5Zm.5-3.5a.5.5 0 1 0-1 0h1Zm-4.85 8.258c-2.367.634-4.691-.708-5.326-3.077l-.966.259c.778 2.901 3.65 4.56 6.55 3.783l-.258-.966ZM3.823 9.114c-.634-2.369.707-4.693 3.074-5.327l-.259-.966c-2.9.777-4.558 3.65-3.78 6.552l.965-.259Zm3.074-5.327c2.369-.635 4.686.695 5.32 3.062l.966-.26c-.778-2.903-3.646-4.545-6.545-3.768l.259.966Zm4.913 7.252-.416-.277v-.001l.001-.001-.002.004a2.205 2.205 0 0 1-.11.139c-.086.098-.22.24-.403.395-.368.311-.937.68-1.731.893l.258.965a5.45 5.45 0 0 0 2.118-1.094 4.605 4.605 0 0 0 .648-.671l.036-.05.01-.015.005-.006a.08.08 0 0 0 .002-.003l-.416-.278ZM10 7.934h3.5v-1H10v1Zm4-.5v-3.5h-1v3.5h1Z"
            />
        </svg>
    );
}

const Memo = memo(IconArrowRoundClockwise16);
export default Memo;
