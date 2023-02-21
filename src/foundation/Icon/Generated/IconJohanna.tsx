import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconJohanna12 from './IconJohanna12';
import IconJohanna16 from './IconJohanna16';
import IconJohanna20 from './IconJohanna20';
import IconJohanna24 from './IconJohanna24';
import IconJohanna32 from './IconJohanna32';

const IconJohanna = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconJohanna12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconJohanna16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconJohanna20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconJohanna24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconJohanna32 {...props} />}
        </span>
    );
};

const MemoizedIconJohanna = memo(IconJohanna);
MemoizedIconJohanna.displayName = 'FondueIconJohanna';

export default MemoizedIconJohanna;
