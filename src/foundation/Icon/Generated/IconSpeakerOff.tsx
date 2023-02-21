import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSpeakerOff12 from './IconSpeakerOff12';
import IconSpeakerOff16 from './IconSpeakerOff16';
import IconSpeakerOff20 from './IconSpeakerOff20';
import IconSpeakerOff24 from './IconSpeakerOff24';
import IconSpeakerOff32 from './IconSpeakerOff32';

const IconSpeakerOff = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSpeakerOff12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSpeakerOff16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSpeakerOff20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSpeakerOff24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSpeakerOff32 {...props} />}
        </span>
    );
};

const MemoizedIconSpeakerOff = memo(IconSpeakerOff);
MemoizedIconSpeakerOff.displayName = 'FondueIconSpeakerOff';

export default MemoizedIconSpeakerOff;
