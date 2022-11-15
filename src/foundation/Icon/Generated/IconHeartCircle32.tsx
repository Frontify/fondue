import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHeartCircle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconHeartCircle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M28 16c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Zm2 0c0 7.732-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2s14 6.268 14 14Zm-19.918-.775c-.197-.835-.084-1.635.807-2.527.579-.579.986-.678 1.202-.695.251-.02.556.053.927.268.374.216.718.524.983.807a5.181 5.181 0 0 1 .35.417l.01.012a2 2 0 0 0 3.279 0l.008-.012.064-.083c.062-.08.16-.197.287-.334.265-.283.609-.59.983-.807.37-.215.676-.287.927-.268.216.017.623.117 1.202.695.891.892 1.004 1.692.807 2.527-.235.998-.96 2.152-2.038 3.337-1.049 1.153-2.28 2.175-3.274 2.92-.217.163-.42.311-.606.443-.185-.132-.389-.28-.606-.443-.994-.745-2.225-1.767-3.274-2.92-1.077-1.186-1.803-2.339-2.038-3.337ZM16 12.362s.539-.781 1.415-1.445c1.226-.93 3.114-1.629 5.11.367C28.118 16.877 16 24.334 16 24.334s-12.118-7.457-6.525-13.05c1.996-1.996 3.884-1.296 5.11-.367A7.11 7.11 0 0 1 16 12.362Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconHeartCircle32);
