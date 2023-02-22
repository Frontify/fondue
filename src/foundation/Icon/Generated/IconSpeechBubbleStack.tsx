import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSpeechBubbleStack12 from './IconSpeechBubbleStack12';
import IconSpeechBubbleStack16 from './IconSpeechBubbleStack16';
import IconSpeechBubbleStack20 from './IconSpeechBubbleStack20';
import IconSpeechBubbleStack24 from './IconSpeechBubbleStack24';
import IconSpeechBubbleStack32 from './IconSpeechBubbleStack32';

const IconSpeechBubbleStack = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSpeechBubbleStack12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSpeechBubbleStack16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSpeechBubbleStack20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSpeechBubbleStack24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSpeechBubbleStack32 {...props} />}
        </span>
    );
};
IconSpeechBubbleStack.displayName = 'FondueIconSpeechBubbleStack';

export default memo(IconSpeechBubbleStack);
