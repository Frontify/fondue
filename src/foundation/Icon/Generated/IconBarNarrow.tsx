import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBarNarrow12 from './IconBarNarrow12';
import IconBarNarrow16 from './IconBarNarrow16';
import IconBarNarrow20 from './IconBarNarrow20';
import IconBarNarrow24 from './IconBarNarrow24';
import IconBarNarrow32 from './IconBarNarrow32';

const IconBarNarrow = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconBarNarrow12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconBarNarrow16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconBarNarrow20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconBarNarrow24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconBarNarrow32 {...props} />}
        </span>
    );
};

const MemoizedIconBarNarrow = memo(IconBarNarrow);
MemoizedIconBarNarrow.displayName = 'FondueIconBarNarrow';

export default MemoizedIconBarNarrow;
