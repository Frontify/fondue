import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeartCircleStack24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconHeartCircleStack24"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M14.265 9.101c1.333.897 1.347 2.783.489 4.62-.791 1.694-2.865 3.75-4.208 3.793h-.065c-1.333-.042-3.407-2.1-4.198-3.793-.858-1.837-.844-3.723.49-4.62 1.24-.834 2.535-.562 3.745.648 1.21-1.21 2.507-1.482 3.747-.648Zm-.827 1.23c.552.37.56 1.507-.026 2.763-.58 1.241-2.272 2.92-2.908 2.94-.608-.022-2.3-1.7-2.879-2.94-.587-1.256-.578-2.392-.026-2.764.685-.46 1.39-.217 2.335.995a.74.74 0 0 0 1.169 0c.945-1.212 1.65-1.456 2.335-.995Z" />
                <path d="M15.726 19.442a8.519 8.519 0 1 1-7.383-14.98l-.013-.017a8.519 8.519 0 1 1 7.396 14.997Zm2.416-2.936a7.037 7.037 0 0 0-6.063-12.182 8.521 8.521 0 0 1 6.063 12.182Zm-7.623 3.231a7.037 7.037 0 1 0 0-14.074 7.037 7.037 0 0 0 0 14.074Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHeartCircleStack24);
export default Memo;
