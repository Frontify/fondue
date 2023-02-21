import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCaretRight12 from './IconCaretRight12';
import IconCaretRight16 from './IconCaretRight16';
import IconCaretRight20 from './IconCaretRight20';
import IconCaretRight24 from './IconCaretRight24';
import IconCaretRight32 from './IconCaretRight32';

const IconCaretRight = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCaretRight12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCaretRight16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCaretRight20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCaretRight24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCaretRight32 {...props} />}
        </span>
    );
};

const MemoizedIconCaretRight = memo(IconCaretRight);
MemoizedIconCaretRight.displayName = 'FondueIconCaretRight';

export default MemoizedIconCaretRight;
