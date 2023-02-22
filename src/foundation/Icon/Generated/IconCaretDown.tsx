import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCaretDown12 from './IconCaretDown12';
import IconCaretDown16 from './IconCaretDown16';
import IconCaretDown20 from './IconCaretDown20';
import IconCaretDown24 from './IconCaretDown24';
import IconCaretDown32 from './IconCaretDown32';

const IconCaretDown = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCaretDown12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCaretDown16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCaretDown20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCaretDown24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCaretDown32 {...props} />}
        </span>
    );
};
IconCaretDown.displayName = 'FondueIconCaretDown';

export default memo(IconCaretDown);
