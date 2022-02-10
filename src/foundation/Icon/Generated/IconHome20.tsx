import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHome20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconHome20"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M13.176 11.829c.668-1.43.657-2.876-.34-3.547-.977-.658-2-.413-2.968.622-.97-1.035-1.991-1.28-2.97-.622-.996.67-1.006 2.117-.34 3.547.622 1.331 2.27 2.967 3.284 3h.045c1.02-.032 2.668-1.669 3.29-3Zm-1.164-2.43c.483.313.49 1.19.033 2.132-.444.915-1.715 2.13-2.247 2.146-.513-.017-1.783-1.231-2.227-2.146-.457-.942-.45-1.82.033-2.132.57-.37 1.158-.173 1.889.73a.412.412 0 0 0 .63 0c.73-.903 1.319-1.1 1.889-.73Z" />
                <path d="M1.785 8.904a.653.653 0 0 0 .909.16l.509-.356v6.799c0 1.209.98 2.189 2.189 2.189h9.216a2.19 2.19 0 0 0 2.189-2.19V8.709l.509.356a.653.653 0 0 0 .749-1.07l-7.68-5.376a.653.653 0 0 0-.75 0l-7.68 5.376a.653.653 0 0 0-.16.91Zm13.706-1.11L10 3.95 4.508 7.794v7.713c0 .488.396.883.884.883h9.216a.883.883 0 0 0 .883-.883V7.794Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHome20);
export default Memo;
