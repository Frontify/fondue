import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconRuler12 from './IconRuler12';
import IconRuler16 from './IconRuler16';
import IconRuler20 from './IconRuler20';
import IconRuler24 from './IconRuler24';
import IconRuler32 from './IconRuler32';

const IconRuler = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconRuler12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconRuler16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconRuler20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconRuler24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconRuler32 {...props} />}
        </span>
    );
};

const MemoizedIconRuler = memo(IconRuler);
MemoizedIconRuler.displayName = 'FondueIconRuler';

export default MemoizedIconRuler;
