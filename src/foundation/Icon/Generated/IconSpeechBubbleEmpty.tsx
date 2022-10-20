import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSpeechBubbleEmpty12 from './IconSpeechBubbleEmpty12';
import IconSpeechBubbleEmpty16 from './IconSpeechBubbleEmpty16';
import IconSpeechBubbleEmpty20 from './IconSpeechBubbleEmpty20';
import IconSpeechBubbleEmpty24 from './IconSpeechBubbleEmpty24';
import IconSpeechBubbleEmpty32 from './IconSpeechBubbleEmpty32'

function IconSpeechBubbleEmpty(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSpeechBubbleEmpty12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconSpeechBubbleEmpty16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconSpeechBubbleEmpty20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconSpeechBubbleEmpty24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconSpeechBubbleEmpty32 {...props}/>}
        </span>
    );
}

export default memo(IconSpeechBubbleEmpty);