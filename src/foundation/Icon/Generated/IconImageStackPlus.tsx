import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconImageStackPlus12 from './IconImageStackPlus12';
import IconImageStackPlus16 from './IconImageStackPlus16';
import IconImageStackPlus20 from './IconImageStackPlus20';
import IconImageStackPlus24 from './IconImageStackPlus24';
import IconImageStackPlus32 from './IconImageStackPlus32';

const IconImageStackPlus = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconImageStackPlus12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconImageStackPlus16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconImageStackPlus20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconImageStackPlus24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconImageStackPlus32 {...props} />}
        </span>
    );
};

const MemoizedIconImageStackPlus = memo(IconImageStackPlus);
MemoizedIconImageStackPlus.displayName = 'FondueIconImageStackPlus';

export default MemoizedIconImageStackPlus;
