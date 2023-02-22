import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLeaf12 from './IconLeaf12';
import IconLeaf16 from './IconLeaf16';
import IconLeaf20 from './IconLeaf20';
import IconLeaf24 from './IconLeaf24';
import IconLeaf32 from './IconLeaf32';

const IconLeaf = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLeaf12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLeaf16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLeaf20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLeaf24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLeaf32 {...props} />}
        </span>
    );
};
IconLeaf.displayName = 'FondueIconLeaf';

export default memo(IconLeaf);
