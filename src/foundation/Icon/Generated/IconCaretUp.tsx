import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCaretUp12 from './IconCaretUp12';
import IconCaretUp16 from './IconCaretUp16';
import IconCaretUp20 from './IconCaretUp20';
import IconCaretUp24 from './IconCaretUp24';
import IconCaretUp32 from './IconCaretUp32';

const IconCaretUp = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCaretUp12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCaretUp16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCaretUp20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCaretUp24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCaretUp32 {...props} />}
        </span>
    );
};

const MemoizedIconCaretUp = memo(IconCaretUp);
MemoizedIconCaretUp.displayName = 'FondueIconCaretUp';

export default MemoizedIconCaretUp;
