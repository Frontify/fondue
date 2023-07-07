import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconClipboardOut12 from './IconClipboardOut12';
import IconClipboardOut16 from './IconClipboardOut16';
import IconClipboardOut20 from './IconClipboardOut20';
import IconClipboardOut24 from './IconClipboardOut24';
import IconClipboardOut32 from './IconClipboardOut32';

const IconClipboardOut = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconClipboardOut12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconClipboardOut16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconClipboardOut20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconClipboardOut24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconClipboardOut32 {...props} />}
        </span>
    );
};
IconClipboardOut.displayName = 'FondueIconClipboardOut';

export default memo(IconClipboardOut);
