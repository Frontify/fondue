import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSpeaker12 from './IconSpeaker12';
import IconSpeaker16 from './IconSpeaker16';
import IconSpeaker20 from './IconSpeaker20';
import IconSpeaker24 from './IconSpeaker24';
import IconSpeaker32 from './IconSpeaker32';

const IconSpeaker = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSpeaker12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSpeaker16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSpeaker20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSpeaker24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSpeaker32 {...props} />}
        </span>
    );
};
IconSpeaker.displayName = 'FondueIconSpeaker';

export default memo(IconSpeaker);
