import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconRocket32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconRocket32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22.088 16.183c-2.446 2.446-5.057 4.138-7.063 5.218-.861.464-1.605.811-2.167 1.055l-3.381-3.38a28.59 28.59 0 0 1 1.055-2.168c1.08-2.006 2.772-4.617 5.219-7.063 1.06-1.061 2.53-1.591 4.132-1.784 1.47-.177 2.9-.05 3.886.103.153.987.28 2.416.103 3.886-.193 1.601-.723 3.072-1.784 4.133Zm-8.06 7.943a1 1 0 0 1-.037.284l-.718 2.607 5.301-3.418v-1.994a32.786 32.786 0 0 1-4.547 2.52Zm6.545-3.953a30.97 30.97 0 0 0 2.93-2.576c2.978-2.979 2.57-7.838 2.197-10.015a1.636 1.636 0 0 0-1.349-1.35c-2.177-.371-7.036-.78-10.015 2.198a30.98 30.98 0 0 0-2.576 2.93l-.043-.001H7.79a1 1 0 0 0-.84.458l-3.714 5.76c-.995 1.543.442 3.5 2.212 3.012l2.129-.587 4.355 4.356-.586 2.128c-.488 1.77 1.468 3.207 3.011 2.212l5.76-3.713a1 1 0 0 0 .458-.841v-3.971Zm-13.05-2.23a1 1 0 0 1 .284-.037 32.777 32.777 0 0 1 2.52-4.547H8.335L4.916 18.66l2.607-.718Zm10.742-4.275a1.852 1.852 0 1 0 2.619-2.619 1.852 1.852 0 0 0-2.62 2.62Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconRocket32);
export default Memo;
