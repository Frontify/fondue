import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSkip5SecondsForward12 from './IconSkip5SecondsForward12';
import IconSkip5SecondsForward16 from './IconSkip5SecondsForward16';
import IconSkip5SecondsForward20 from './IconSkip5SecondsForward20';
import IconSkip5SecondsForward24 from './IconSkip5SecondsForward24';
import IconSkip5SecondsForward32 from './IconSkip5SecondsForward32';

const IconSkip5SecondsForward = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSkip5SecondsForward12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSkip5SecondsForward16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSkip5SecondsForward20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSkip5SecondsForward24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSkip5SecondsForward32 {...props} />}
        </span>
    );
};
IconSkip5SecondsForward.displayName = 'FondueIconSkip5SecondsForward';

export default memo(IconSkip5SecondsForward);
