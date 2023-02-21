import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextIndent12 from './IconTextIndent12';
import IconTextIndent16 from './IconTextIndent16';
import IconTextIndent20 from './IconTextIndent20';
import IconTextIndent24 from './IconTextIndent24';
import IconTextIndent32 from './IconTextIndent32';

const IconTextIndent = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextIndent12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextIndent16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextIndent20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextIndent24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextIndent32 {...props} />}
        </span>
    );
};

const MemoizedIconTextIndent = memo(IconTextIndent);
MemoizedIconTextIndent.displayName = 'FondueIconTextIndent';

export default MemoizedIconTextIndent;
