import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeartCircleStack20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconHeartCircleStack20"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M11.887 7.584c1.112.748 1.123 2.32.408 3.85-.66 1.412-2.387 3.126-3.507 3.161h-.053c-1.112-.035-2.84-1.75-3.499-3.16-.715-1.531-.704-3.103.408-3.85 1.033-.696 2.113-.47 3.121.54 1.01-1.01 2.089-1.236 3.122-.54Zm-.689 1.025c.46.31.468 1.256-.022 2.303-.483 1.034-1.892 2.432-2.422 2.45-.508-.018-1.916-1.417-2.4-2.45-.489-1.047-.482-1.994-.022-2.303.572-.385 1.159-.181 1.947.829a.617.617 0 0 0 .973 0c.788-1.01 1.375-1.214 1.946-.83Z" />
                <path d="M13.105 16.202A7.099 7.099 0 1 1 6.953 3.718l-.011-.014a7.099 7.099 0 1 1 6.163 12.498Zm2.013-2.447a5.864 5.864 0 0 0-5.052-10.151 7.101 7.101 0 0 1 5.052 10.15Zm-6.353 2.693a5.864 5.864 0 1 0 0-11.729 5.864 5.864 0 0 0 0 11.729Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHeartCircleStack20);
export default Memo;
