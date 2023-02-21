import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectTextTop12 from './IconMediaObjectTextTop12';
import IconMediaObjectTextTop16 from './IconMediaObjectTextTop16';
import IconMediaObjectTextTop20 from './IconMediaObjectTextTop20';
import IconMediaObjectTextTop24 from './IconMediaObjectTextTop24';
import IconMediaObjectTextTop32 from './IconMediaObjectTextTop32';

const IconMediaObjectTextTop = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectTextTop12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectTextTop16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMediaObjectTextTop20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMediaObjectTextTop24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectTextTop32 {...props} />}
        </span>
    );
};

const MemoizedIconMediaObjectTextTop = memo(IconMediaObjectTextTop);
MemoizedIconMediaObjectTextTop.displayName = 'FondueIconMediaObjectTextTop';

export default MemoizedIconMediaObjectTextTop;
