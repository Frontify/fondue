import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMusicNote12 from './IconMusicNote12';
import IconMusicNote16 from './IconMusicNote16';
import IconMusicNote20 from './IconMusicNote20';
import IconMusicNote24 from './IconMusicNote24';
import IconMusicNote32 from './IconMusicNote32';

const IconMusicNote = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMusicNote12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMusicNote16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMusicNote20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMusicNote24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMusicNote32 {...props} />}
        </span>
    );
};

const MemoizedIconMusicNote = memo(IconMusicNote);
MemoizedIconMusicNote.displayName = 'FondueIconMusicNote';

export default MemoizedIconMusicNote;
