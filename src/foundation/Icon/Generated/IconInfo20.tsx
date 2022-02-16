import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconInfo20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconInfo20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.646 2.056c-.19-.26-.48-.39-.874-.39-.362 0-.684.13-.968.39-.283.26-.472.61-.566 1.05-.08.41-.027.744.153 1.004s.46.39.838.39c.393 0 .732-.13 1.015-.39.284-.26.464-.594.543-1.003.095-.44.047-.791-.141-1.05ZM9.093 10.13c-.07.339-.192.806-.366 1.404l-.968 3.4c-.283 1.023-.334 1.845-.153 2.467.18.622.664.932 1.452.932.44 0 .885-.138 1.333-.413.449-.275.901-.664 1.358-1.168-.047-.346-.19-.599-.425-.756-.236.236-.46.41-.673.52-.213.11-.398.165-.555.165a.48.48 0 0 1-.271-.07c-.071-.048-.115-.134-.13-.26-.015-.127 0-.311.047-.555.047-.245.126-.555.236-.933l1.299-4.556c.268-.976.35-1.703.248-2.184-.103-.48-.398-.822-.886-1.027a3.936 3.936 0 0 1-.554.295l.067-.027c-.479.219-.977.404-1.567.57a3.512 3.512 0 0 1-.66.13l.004-.013a1.989 1.989 0 0 0-.146.91c.393 0 .696.024.909.071.212.047.35.157.413.33.062.174.059.43-.012.768Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconInfo20);
export default Memo;
