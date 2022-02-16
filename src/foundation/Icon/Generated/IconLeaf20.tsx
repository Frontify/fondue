import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLeaf20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLeaf20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.95 10.49c.857-2.538 1.023-5.62.306-6.345-.721-.732-3.794-.577-6.365.27-3.364 1.11-5.518 3.177-5.518 6.157a5.29 5.29 0 0 0 1.205 3.369L4.14 15.393a.625.625 0 0 0 .888.88l1.453-1.466a5.287 5.287 0 0 0 3.197 1.075c3.038.066 5.145-2.045 6.274-5.392Zm-8.58 3.419a4.042 4.042 0 0 0 2.314.723h.014c2.388.055 4.094-1.653 5.068-4.542.712-2.108.857-4.808.6-5.068-.255-.26-2.95-.123-5.084.58-2.908.96-4.659 2.64-4.659 4.97 0 .931.314 1.79.841 2.474l.994-1.003a.65.65 0 0 1 .002-.02l.329-2.894a.625.625 0 0 1 1.242.14l-.152 1.34 2.256-2.277a.625.625 0 1 1 .888.88L9.81 11.445l1.358-.179a.625.625 0 1 1 .163 1.24l-2.957.388L7.37 13.91Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLeaf20);
export default Memo;
