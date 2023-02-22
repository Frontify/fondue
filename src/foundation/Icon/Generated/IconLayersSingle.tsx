import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLayersSingle12 from './IconLayersSingle12';
import IconLayersSingle16 from './IconLayersSingle16';
import IconLayersSingle20 from './IconLayersSingle20';
import IconLayersSingle24 from './IconLayersSingle24';
import IconLayersSingle32 from './IconLayersSingle32';

const IconLayersSingle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLayersSingle12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLayersSingle16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLayersSingle20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLayersSingle24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLayersSingle32 {...props} />}
        </span>
    );
};
IconLayersSingle.displayName = 'FondueIconLayersSingle';

export default memo(IconLayersSingle);
