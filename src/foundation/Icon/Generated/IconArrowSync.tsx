import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowSync12 from './IconArrowSync12';
import IconArrowSync16 from './IconArrowSync16';
import IconArrowSync20 from './IconArrowSync20';
import IconArrowSync24 from './IconArrowSync24';
import IconArrowSync32 from './IconArrowSync32';

const IconArrowSync = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowSync12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowSync16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowSync20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowSync24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowSync32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowSync = memo(IconArrowSync);
MemoizedIconArrowSync.displayName = 'FondueIconArrowSync';

export default MemoizedIconArrowSync;
