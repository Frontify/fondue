import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSoundWave12 from './IconSoundWave12';
import IconSoundWave16 from './IconSoundWave16';
import IconSoundWave20 from './IconSoundWave20';
import IconSoundWave24 from './IconSoundWave24';
import IconSoundWave32 from './IconSoundWave32';

const IconSoundWave = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSoundWave12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSoundWave16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSoundWave20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSoundWave24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSoundWave32 {...props} />}
        </span>
    );
};

const MemoizedIconSoundWave = memo(IconSoundWave);
MemoizedIconSoundWave.displayName = 'FondueIconSoundWave';

export default MemoizedIconSoundWave;
