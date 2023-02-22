import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCaretLeft12 from './IconCaretLeft12';
import IconCaretLeft16 from './IconCaretLeft16';
import IconCaretLeft20 from './IconCaretLeft20';
import IconCaretLeft24 from './IconCaretLeft24';
import IconCaretLeft32 from './IconCaretLeft32';

const IconCaretLeft = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCaretLeft12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCaretLeft16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCaretLeft20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCaretLeft24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCaretLeft32 {...props} />}
        </span>
    );
};
IconCaretLeft.displayName = 'FondueIconCaretLeft';

export default memo(IconCaretLeft);
