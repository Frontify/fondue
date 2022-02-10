import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowRoundAntiClockwise32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowRoundAntiClockwise32"
            {...props}
        >
            <path
                fill="currentColor"
                d="m13.915 23.727-.259.966.259-.966Zm-4.691-9.539a1 1 0 0 1-1.932-.517l1.932.517Zm-.334 7.426a1 1 0 1 1 1.65-1.13l-1.65 1.13ZM12.486 14a1 1 0 1 1 0 2v-2Zm-5.5 1v1h-1v-1h1Zm-1-5.5a1 1 0 0 1 2 0h-2Zm8.188 13.262c3.813 1.021 7.551-1.137 8.573-4.95l1.932.517c-1.308 4.88-6.143 7.672-11.023 6.364l.518-1.931Zm8.573-4.95c1.022-3.814-1.137-7.552-4.95-8.573l.518-1.932c4.88 1.307 7.671 6.142 6.364 11.022l-1.932-.517Zm-4.95-8.573c-3.813-1.022-7.551 1.136-8.573 4.95l-1.932-.518C8.6 8.79 13.435 5.999 18.315 7.307l-.518 1.932Zm-8.082 11.81.825-.565v-.001l-.001-.001-.002-.002v-.001l.003.004.029.039c.029.038.077.098.146.176.137.157.354.382.653.63a7.33 7.33 0 0 0 2.806 1.434l-.518 1.931a9.332 9.332 0 0 1-3.567-1.827 7.887 7.887 0 0 1-.876-.847 5.588 5.588 0 0 1-.312-.388l-.006-.01-.003-.004-.001-.001v-.001l.824-.566ZM12.485 16h-5.5v-2h5.5v2Zm-6.5-1V9.5h2V15h-2Z"
            />
        </svg>
    );
}

const Memo = memo(IconArrowRoundAntiClockwise32);
export default Memo;
