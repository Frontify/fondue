import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSpeechBubbleDots12 from './IconSpeechBubbleDots12';
import IconSpeechBubbleDots16 from './IconSpeechBubbleDots16';
import IconSpeechBubbleDots20 from './IconSpeechBubbleDots20';
import IconSpeechBubbleDots24 from './IconSpeechBubbleDots24';
import IconSpeechBubbleDots32 from './IconSpeechBubbleDots32';

const IconSpeechBubbleDots = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSpeechBubbleDots12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSpeechBubbleDots16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSpeechBubbleDots20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSpeechBubbleDots24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSpeechBubbleDots32 {...props} />}
        </span>
    );
};

const MemoizedIconSpeechBubbleDots = memo(IconSpeechBubbleDots);
MemoizedIconSpeechBubbleDots.displayName = 'FondueIconSpeechBubbleDots';

export default MemoizedIconSpeechBubbleDots;
