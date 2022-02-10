import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLabel20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLabel20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.93 12.521a1.36 1.36 0 0 0 .403-1c0-.373-.134-.706-.404-1.001l-7.871-7.852c-.282-.27-.655-.5-1.116-.693-.475-.206-.905-.308-1.29-.308h-4.58c-.385 0-.712.14-.982.423a1.368 1.368 0 0 0-.423 1v4.562c0 .398.096.828.288 1.29.193.474.43.846.713 1.116l7.871 7.871c.27.27.597.404.982.404.384 0 .718-.134 1-.404l5.408-5.408ZM9.098 3.672c5.23 5.22 7.846 7.842 7.848 7.867-3.606 3.604-5.415 5.406-5.426 5.408L3.65 9.076c-.152-.146-.285-.353-.407-.656-.131-.314-.187-.565-.187-.768-.006-3.037 0-4.569.016-4.596h4.58c.18 0 .427.059.738.193.33.138.559.28.709.423ZM8.61 6.528c0 .56-.21 1.08-.63 1.5a2.1 2.1 0 0 1-2.93-.023 2.06 2.06 0 0 1-.606-1.477c0-.558.212-1.073.606-1.467a2.064 2.064 0 0 1 1.477-.616c.562 0 1.08.218 1.477.616.394.394.606.91.606 1.467Zm-1.588-.485a.66.66 0 0 1 .2.485.672.672 0 0 1-.2.495.692.692 0 0 1-.495.2.692.692 0 0 1-.495-.2.672.672 0 0 1-.2-.495.66.66 0 0 1 .2-.485c.14-.14.305-.21.495-.21s.355.07.495.21Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLabel20);
export default Memo;
