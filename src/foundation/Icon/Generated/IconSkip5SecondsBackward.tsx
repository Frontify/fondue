import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSkip5SecondsBackward12 from './IconSkip5SecondsBackward12';
import IconSkip5SecondsBackward16 from './IconSkip5SecondsBackward16';
import IconSkip5SecondsBackward20 from './IconSkip5SecondsBackward20';
import IconSkip5SecondsBackward24 from './IconSkip5SecondsBackward24';
import IconSkip5SecondsBackward32 from './IconSkip5SecondsBackward32';

const IconSkip5SecondsBackward = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSkip5SecondsBackward12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSkip5SecondsBackward16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSkip5SecondsBackward20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSkip5SecondsBackward24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSkip5SecondsBackward32 {...props} />}
        </span>
    );
};
IconSkip5SecondsBackward.displayName = 'FondueIconSkip5SecondsBackward';

export default memo(IconSkip5SecondsBackward);
