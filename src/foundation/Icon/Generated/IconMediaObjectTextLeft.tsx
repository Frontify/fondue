import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectTextLeft12 from './IconMediaObjectTextLeft12';
import IconMediaObjectTextLeft16 from './IconMediaObjectTextLeft16';
import IconMediaObjectTextLeft20 from './IconMediaObjectTextLeft20';
import IconMediaObjectTextLeft24 from './IconMediaObjectTextLeft24';
import IconMediaObjectTextLeft32 from './IconMediaObjectTextLeft32';

const IconMediaObjectTextLeft = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectTextLeft12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectTextLeft16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMediaObjectTextLeft20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMediaObjectTextLeft24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectTextLeft32 {...props} />}
        </span>
    );
};
IconMediaObjectTextLeft.displayName = 'FondueIconMediaObjectTextLeft';

export default memo(IconMediaObjectTextLeft);
