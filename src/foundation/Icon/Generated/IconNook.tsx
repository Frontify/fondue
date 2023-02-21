import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconNook12 from './IconNook12';
import IconNook16 from './IconNook16';
import IconNook20 from './IconNook20';
import IconNook24 from './IconNook24';
import IconNook32 from './IconNook32';

const IconNook = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconNook12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconNook16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconNook20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconNook24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconNook32 {...props} />}
        </span>
    );
};

const MemoizedIconNook = memo(IconNook);
MemoizedIconNook.displayName = 'FondueIconNook';

export default MemoizedIconNook;
