import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectTextBottom12 from './IconMediaObjectTextBottom12';
import IconMediaObjectTextBottom16 from './IconMediaObjectTextBottom16';
import IconMediaObjectTextBottom20 from './IconMediaObjectTextBottom20';
import IconMediaObjectTextBottom24 from './IconMediaObjectTextBottom24';
import IconMediaObjectTextBottom32 from './IconMediaObjectTextBottom32';

const IconMediaObjectTextBottom = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectTextBottom12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectTextBottom16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMediaObjectTextBottom20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMediaObjectTextBottom24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectTextBottom32 {...props} />}
        </span>
    );
};

const MemoizedIconMediaObjectTextBottom = memo(IconMediaObjectTextBottom);
MemoizedIconMediaObjectTextBottom.displayName = 'FondueIconMediaObjectTextBottom';

export default MemoizedIconMediaObjectTextBottom;
