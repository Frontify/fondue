import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconClipboardAt12 from './IconClipboardAt12';
import IconClipboardAt16 from './IconClipboardAt16';
import IconClipboardAt20 from './IconClipboardAt20';
import IconClipboardAt24 from './IconClipboardAt24';
import IconClipboardAt32 from './IconClipboardAt32';

const IconClipboardAt = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconClipboardAt12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconClipboardAt16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconClipboardAt20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconClipboardAt24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconClipboardAt32 {...props} />}
        </span>
    );
};

const MemoizedIconClipboardAt = memo(IconClipboardAt);
MemoizedIconClipboardAt.displayName = 'FondueIconClipboardAt';

export default MemoizedIconClipboardAt;
