import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeartCircle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconHeartCircle12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 11A5 5 0 1 1 6 1a5 5 0 0 1 0 10Zm2.668-4.446c.539-1.182.53-2.379-.274-2.934-.788-.544-1.613-.34-2.394.515-.781-.856-1.606-1.06-2.394-.515-.804.555-.813 1.752-.274 2.934.5 1.101 1.83 2.455 2.647 2.482h.037c.823-.027 2.151-1.38 2.652-2.482Zm-.68-2.346c.436.301.442 1.145.03 2.05-.4.88-1.547 2.048-2.027 2.063-.463-.016-1.61-1.183-2.01-2.063-.411-.905-.405-1.749.03-2.05.515-.355 1.046-.166 1.705.701a.357.357 0 0 0 .568 0c.66-.867 1.19-1.056 1.704-.7ZM10.286 6a4.286 4.286 0 1 1-8.572 0 4.286 4.286 0 0 1 8.572 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconHeartCircle12);
export default Memo;
