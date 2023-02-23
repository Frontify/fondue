import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMegaMenu12 from './IconMegaMenu12';
import IconMegaMenu16 from './IconMegaMenu16';
import IconMegaMenu20 from './IconMegaMenu20';
import IconMegaMenu24 from './IconMegaMenu24';
import IconMegaMenu32 from './IconMegaMenu32';

const IconMegaMenu = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMegaMenu12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMegaMenu16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMegaMenu20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMegaMenu24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMegaMenu32 {...props} />}
        </span>
    );
};
IconMegaMenu.displayName = 'FondueIconMegaMenu';

export default memo(IconMegaMenu);
