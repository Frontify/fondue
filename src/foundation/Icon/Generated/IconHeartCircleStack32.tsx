import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeartCircleStack32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconHeartCircleStack32"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M19.02 12.135c1.778 1.196 1.796 3.71.652 6.16-1.055 2.258-3.82 5.001-5.61 5.057h-.086c-1.78-.056-4.543-2.8-5.598-5.057-1.145-2.45-1.126-4.965.652-6.16 1.653-1.112 3.381-.75 4.995.864 1.614-1.614 3.341-1.976 4.995-.864Zm-1.102 1.639c.736.495.747 2.01-.036 3.685-.773 1.654-3.028 3.892-3.876 3.919-.812-.028-3.066-2.265-3.839-3.92-.783-1.674-.771-3.189-.035-3.684.914-.615 1.854-.29 3.114 1.327a.988.988 0 0 0 1.558 0c1.26-1.617 2.2-1.942 3.114-1.327Z" />
                <path d="M20.968 25.923a11.309 11.309 0 0 1-6.943 2.369c-6.273 0-11.358-5.086-11.358-11.359 0-5.27 3.59-9.702 8.457-10.984l-.017-.022A11.31 11.31 0 0 1 17.995 3.6c6.273 0 11.358 5.085 11.358 11.358 0 5.174-3.487 9.641-8.385 10.965Zm3.221-3.915a9.383 9.383 0 0 0-8.084-16.242c5.28.977 9.278 5.605 9.278 11.167 0 1.824-.43 3.547-1.194 5.075Zm-10.164 4.308c5.182 0 9.382-4.2 9.382-9.383a9.383 9.383 0 1 0-18.765 0c0 5.182 4.2 9.383 9.383 9.383Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHeartCircleStack32);
export default Memo;
