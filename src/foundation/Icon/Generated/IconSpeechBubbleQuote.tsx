import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSpeechBubbleQuote12 from './IconSpeechBubbleQuote12';
import IconSpeechBubbleQuote16 from './IconSpeechBubbleQuote16';
import IconSpeechBubbleQuote20 from './IconSpeechBubbleQuote20';
import IconSpeechBubbleQuote24 from './IconSpeechBubbleQuote24';
import IconSpeechBubbleQuote32 from './IconSpeechBubbleQuote32';

const IconSpeechBubbleQuote = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSpeechBubbleQuote12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSpeechBubbleQuote16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSpeechBubbleQuote20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSpeechBubbleQuote24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSpeechBubbleQuote32 {...props} />}
        </span>
    );
};
IconSpeechBubbleQuote.displayName = 'FondueIconSpeechBubbleQuote';

export default memo(IconSpeechBubbleQuote);
