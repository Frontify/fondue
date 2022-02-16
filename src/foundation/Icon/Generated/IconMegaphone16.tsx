import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMegaphone16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMegaphone16"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10.717 1.518 7.444 3.676H3c-.92 0-1.667.738-1.667 1.649v2.747c0 .579.3 1.087.756 1.382l1.156 4.79c.06.248.283.423.54.423h1.437a.553.553 0 0 0 .555-.55V9.721h1.667l3.273 2.158c.182.12.397.185.616.185.614 0 1.111-.492 1.111-1.1v-8.53c0-.217-.065-.43-.187-.61a1.119 1.119 0 0 0-1.54-.305ZM5.222 8.622H2.998a.553.553 0 0 1-.554-.55V5.325c0-.304.249-.55.556-.55h2.222v3.847Zm-.998 4.946h.442V9.72h-1.37l.928 3.847Zm2.109-8.793v3.847h1.448l3.552 2.343V2.433L7.781 4.775H6.333Z"
                    clipRule="evenodd"
                />
                <path d="M14.11 4.775a.556.556 0 0 0-.555.556v2.735a.556.556 0 1 0 1.111 0V5.331a.556.556 0 0 0-.555-.556Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMegaphone16);
export default Memo;
