import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHome32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconHome32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m16 3.703.637.526 11.5 9.5a1 1 0 1 1-1.274 1.542L26 14.558V23a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-8.442l-.863.713a1 1 0 1 1-1.274-1.542l11.5-9.5.637-.526Zm0 2.594 8 6.609V23a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V12.906l8-6.609Zm-3.458 10.252c-.095-.413-.06-.774.402-1.248.359-.367.594-.439.68-.457a.582.582 0 0 1 .332.036 1.628 1.628 0 0 1 .554.36l.013.012a2 2 0 0 0 2.954 0l.013-.013c.022-.022.065-.061.124-.108a1.6 1.6 0 0 1 .43-.25.582.582 0 0 1 .333-.037c.085.018.32.09.679.457.463.474.497.835.402 1.248-.13.566-.555 1.289-1.268 2.091-.686.773-1.5 1.465-2.166 1.976l-.024.018-.024-.018c-.666-.511-1.48-1.203-2.166-1.976-.713-.802-1.138-1.525-1.268-2.09ZM16 13.903s.168-.189.46-.408c.753-.563 2.333-1.324 4.026.408 3.845 3.935-4.486 9.18-4.486 9.18s-8.331-5.245-4.486-9.18c1.693-1.732 3.273-.97 4.025-.408.293.22.461.408.461.408Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconHome32);
